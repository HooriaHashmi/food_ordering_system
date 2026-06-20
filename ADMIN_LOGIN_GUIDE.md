# Admin Login Guide

## 🔐 How to Login as Admin

### Step 1: Go to Admin Login Page
- Navigate to `admin-login.html`
- Or use the "Admin Login" link from your site

### Step 2: Enter Credentials
**Default Admin Credentials:**
- **Username:** `admin`
- **Password:** `admin123`

Or try:
- **Username:** `manager`
- **Password:** `manager123`

### Step 3: Click "Login as Admin"
- You'll be redirected to the admin dashboard

---

## 📍 Admin Dashboard Pages

Once logged in, you have access to:

1. **Admin Dashboard** (`admin.html`)
   - View order statistics
   - See recent orders
   - Quick actions

2. **Manage Orders** (`admin-orders.html`)
   - View all orders in table format
   - Search and filter orders
   - Update order status
   - View order details
   - Add admin notes

3. **Analytics** (`admin-analytics.html`)
   - View order statistics
   - Popular items
   - Top customers
   - Revenue metrics
   - Time period analysis

---

## 🚪 Logout

On any admin page, click the **Logout button** (top right) to exit admin mode.

---

## 🔒 Security Features

✅ Admin login required to access admin pages
✅ Sessions stored in browser storage
✅ Logout clears admin session
✅ Cannot access admin without logging in

---

## 🛠️ Customizing Admin Credentials

To change admin passwords, edit `admin-login.js`:

```javascript
const validAdmins = [
    { username: 'admin', password: 'admin123' },
    { username: 'manager', password: 'manager123' }
];
```

Add or modify credentials as needed.

---

## 💡 Quick Test Flow

1. Place an order as a customer
2. Go to `admin-login.html`
3. Login with `admin` / `admin123`
4. Go to "Manage Orders"
5. See your order
6. Update its status
7. Go back to `orders.html` as customer
8. Refresh - status is updated!

---

**That's it! You're ready to manage orders as admin.**
