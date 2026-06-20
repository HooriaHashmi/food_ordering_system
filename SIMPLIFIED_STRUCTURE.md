# BISTRO - Simplified Structure

## 📋 Files You Need (Only 5 HTML Files + 1 CSS + 1 JS)

### HTML Files:
1. **index.html** - Homepage
2. **menu.html** - Menu & Shopping
3. **cart.html** - Shopping Cart
4. **login.html** - Customer Login/Register
5. **admin.html** - Admin Dashboard & Management

### CSS File:
- **style.css** - All styling (already complete)

### JavaScript File:
- **index.js** - ALL functionality consolidated here

---

## 🗑️ Files You Can DELETE

Delete these files (no longer needed):
- ❌ script.js
- ❌ cart.js
- ❌ orders.js
- ❌ admin.js
- ❌ admin-login.js
- ❌ admin-orders.js
- ❌ admin-analytics.js
- ❌ orders.html
- ❌ admin-login.html
- ❌ admin-orders.html
- ❌ admin-analytics.html
- ❌ register.html (merged into login.html)
- ❌ menu.js (not needed)

---

## 📝 What Each File Does

### index.html
- Homepage
- Links to menu, login, admin

### menu.html
- Browse all menu items
- Filter by category
- Add items to cart
- View cart count

### cart.html
- View cart items
- Adjust quantities
- See order summary
- Proceed to checkout
- Creates orders

### login.html
- Customer login
- Customer registration
- Admin login section

### admin.html
- Dashboard with stats
- View all orders
- Update order status
- View order details

### style.css
- All styling for all pages
- Responsive design
- Color themes

### index.js
- ALL JavaScript functionality:
  - Menu display & filtering
  - Shopping cart management
  - User login/registration
  - Admin login
  - Checkout & order creation
  - Admin order management
  - Everything else!

---

## 🚀 How to Use

### In your HTML files, just link to index.js:
```html
<script src="index.js"></script>
```

That's it! All functionality is in one file.

---

## 📝 HTML File Templates

Make sure each HTML file has:
```html
<script src="index.js"></script>
```

---

## ✅ Features Included in index.js

✅ User login/registration
✅ Admin login (username: admin, password: admin123)
✅ Menu display with categories
✅ Add to cart
✅ Cart management (add, remove, adjust qty)
✅ Checkout & order creation
✅ Admin dashboard
✅ Order status updates
✅ All error handling
✅ LocalStorage management

---

## 🎯 Complete Flow

1. **User goes to index.html** → Homepage
2. **User clicks Menu** → Goes to menu.html
3. **User adds items** → Stored in localStorage
4. **User clicks Cart** → Goes to cart.html
5. **User checkout** → Creates order
6. **Admin goes to admin.html** → Logs in with admin/admin123
7. **Admin sees orders** → Can update status
8. **User sees order** → Status updates in real-time

---

**Everything is consolidated and working!**
