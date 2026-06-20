const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const path = require('path');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // Serve HTML/CSS/JS

// --- AUTH API ---

// Register
app.post('/api/register', async (req, res) => {
    const { name, email, roomNumber, password } = req.body;
    
    if (!name || !email || !roomNumber || !password) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        const hash = await bcrypt.hash(password, 10);
        db.run(`INSERT INTO users (name, email, roomNumber, password) VALUES (?, ?, ?, ?)`,
            [name, email, roomNumber, hash],
            function(err) {
                if (err) {
                    if (err.message.includes('UNIQUE constraint failed')) {
                        return res.status(400).json({ error: 'Email already exists' });
                    }
                    return res.status(500).json({ error: 'Database error' });
                }
                res.status(201).json({ id: this.lastID, name, email, roomNumber });
            }
        );
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

// Login
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    db.get(`SELECT * FROM users WHERE email = ? AND role = 'user'`, [email], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(401).json({ error: 'Invalid email or password' });

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.json({ id: user.id, name: user.name, email: user.email, roomNumber: user.roomNumber });
        } else {
            res.status(401).json({ error: 'Invalid email or password' });
        }
    });
});

// Admin Login
app.post('/api/admin-login', (req, res) => {
    const { username, password } = req.body;
    
    db.get(`SELECT * FROM users WHERE email = ? AND role = 'admin'`, [username], async (err, user) => {
        if (err) return res.status(500).json({ error: 'Database error' });
        if (!user) return res.status(401).json({ error: 'Invalid username or password' });

        const match = await bcrypt.compare(password, user.password);
        if (match) {
            res.json({ id: user.id, username: user.email });
        } else {
            res.status(401).json({ error: 'Invalid username or password' });
        }
    });
});

// --- MENU API ---

app.get('/api/menu', (req, res) => {
    db.all(`SELECT * FROM menu_items`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// --- ORDERS API ---

// Place an order
app.post('/api/orders', (req, res) => {
    const { id, userEmail, userName, userRoom, items, subtotal, deliveryFee, total } = req.body;
    
    db.run(`INSERT INTO orders (id, userEmail, userName, userRoom, items, subtotal, deliveryFee, total, status) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
        [id, userEmail, userName, userRoom, JSON.stringify(items), subtotal, deliveryFee, total],
        function(err) {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ success: true, orderId: id });
        }
    );
});

// Get user orders
app.get('/api/orders', (req, res) => {
    const email = req.query.email;
    if (!email) return res.status(400).json({ error: 'Email required' });

    db.all(`SELECT * FROM orders WHERE userEmail = ? ORDER BY createdAt DESC`, [email], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Parse JSON items
        const orders = rows.map(r => ({ ...r, items: JSON.parse(r.items) }));
        res.json(orders);
    });
});

// Get all orders (Admin)
app.get('/api/admin/orders', (req, res) => {
    db.all(`SELECT * FROM orders ORDER BY createdAt DESC`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        
        const orders = rows.map(r => ({ ...r, items: JSON.parse(r.items) }));
        res.json(orders);
    });
});

// Update order status (Admin)
app.put('/api/admin/orders/:id/status', (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    db.run(`UPDATE orders SET status = ? WHERE id = ?`, [status, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ error: 'Order not found' });
        res.json({ success: true, id, status });
    });
});

// Fallback route removed

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
