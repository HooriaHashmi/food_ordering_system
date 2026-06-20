const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database', err.message);
    } else {
        console.log('Connected to the SQLite database.');
        
        // Create users table
        db.run(`CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL,
            roomNumber TEXT NOT NULL,
            password TEXT NOT NULL,
            role TEXT DEFAULT 'user',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
        )`, (err) => {
            if (err) console.error(err);
            
            // Insert default admins
            bcrypt.hash('admin123', 10, (err, hash) => {
                db.run(`INSERT OR IGNORE INTO users (name, email, roomNumber, password, role) VALUES (?, ?, ?, ?, ?)`, 
                    ['Admin', 'admin', 'N/A', hash, 'admin']);
            });
            bcrypt.hash('manager123', 10, (err, hash) => {
                db.run(`INSERT OR IGNORE INTO users (name, email, roomNumber, password, role) VALUES (?, ?, ?, ?, ?)`, 
                    ['Manager', 'manager', 'N/A', hash, 'admin']);
            });
        });

        // Create menu_items table
        db.run(`CREATE TABLE IF NOT EXISTS menu_items (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            description TEXT,
            price REAL NOT NULL,
            category TEXT NOT NULL,
            image TEXT
        )`, (err) => {
            if (err) console.error(err);
            
            // Check if menu is empty, if so, populate it
            db.get("SELECT COUNT(*) as count FROM menu_items", (err, row) => {
                if (row && row.count === 0) {
                    const defaultMenu = [
                        { name: "Classic Burger", description: "Juicy beef patty with lettuce, tomato, and special sauce", price: 25.00, category: "lunch", image: "./burgerss.jpg" },
                        { name: "Jollof Rice & Chicken", description: "Spicy Ghanaian jollof with grilled chicken", price: 30.00, category: "lunch", image: "/jolllof.jpg" },
                        { name: "Waakye Special", description: "Rice and beans with spaghetti, gari, and protein", price: 20.00, category: "breakfast", image: "/waakye.jpg" },
                        { name: "Fried Rice", description: "Mixed vegetables with chicken and shrimp", price: 28.00, category: "dinner", image: "/fried-rice.webp" },
                        { name: "Banku & Tilapia", description: "Traditional fermented corn dough with grilled tilapia", price: 35.00, category: "dinner", image: "/tilapia.jpg" },
                        { name: "Pizza Margherita", description: "Fresh mozzarella, tomato sauce, and basil", price: 40.00, category: "lunch", image: "/pizza.jpg" },
                        { name: "Fufu & Light Soup", description: "Pounded cassava with goat meat light soup", price: 32.00, category: "dinner", image: "/fufu.jpg" },
                        { name: "Chicken Shawarma", description: "Grilled chicken wrap with veggies and sauce", price: 22.00, category: "lunch", image: "/shawarma.webp" },
                        { name: "Fresh Orange Juice", description: "Freshly squeezed orange juice", price: 15.00, category: "drinks", image: "/orange.jpg" },
                        { name: "Sobolo Drink", description: "Refreshing hibiscus drink", price: 10.00, category: "drinks", image: "/sobolo.jpg" },
                        { name: "Chocolate Cake", description: "Rich chocolate layer cake with frosting", price: 45.00, category: "desserts", image: "/cake.jpg" }
                    ];
                    
                    const stmt = db.prepare("INSERT INTO menu_items (name, description, price, category, image) VALUES (?, ?, ?, ?, ?)");
                    defaultMenu.forEach(item => {
                        stmt.run([item.name, item.description, item.price, item.category, item.image]);
                    });
                    stmt.finalize();
                }
            });
        });

        // Create orders table
        db.run(`CREATE TABLE IF NOT EXISTS orders (
            id TEXT PRIMARY KEY,
            userId INTEGER,
            userEmail TEXT,
            userName TEXT,
            userRoom TEXT,
            items TEXT NOT NULL,
            subtotal REAL,
            deliveryFee REAL,
            total REAL,
            status TEXT DEFAULT 'pending',
            createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY(userId) REFERENCES users(id)
        )`);
    }
});

module.exports = db;
