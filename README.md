# 🛒 ShopSphere

A full-stack e-commerce web application built using the MERN stack. ShopSphere allows users to browse products, manage their shopping cart, place orders, and provides an admin dashboard for managing customer orders.

---

## 🚀 Live Demo

### Frontend
https://shopsphere-amber.vercel.app

### Backend API
https://shopsphere-fy8n.onrender.com

---

# ✨ Features

## 👤 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Logout

---

## 🛍 Products

- View all products
- Product images
- Product categories
- Product descriptions
- Product prices
- Stock availability

---

## 🛒 Shopping Cart

- Add products to cart
- View cart
- Remove products from cart
- Automatic total price calculation

---

## 📦 Orders

- Checkout
- Place orders
- View order history
- Order status tracking

---

## 👨‍💼 Admin Features

- View all customer orders
- Update order status
- Role-Based Access Control (RBAC)

---

# 🛠 Tech Stack

## Frontend

- React
- React Router DOM
- Axios
- CSS

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- CORS
- dotenv

## Deployment

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas

---

# 📁 Project Structure

```
ShopSphere
│
├── backend
│   ├── middleware
│   ├── models
│   ├── server.js
│   └── package.json
│
└── frontend
    ├── src
    │   ├── pages
    │   ├── components
    │   └── App.jsx
    └── package.json
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint |
|---------|----------|
| POST | /register |
| POST | /login |
| GET | /profile |

---

## Products

| Method | Endpoint |
|---------|----------|
| GET | /products |
| POST | /products |
| PUT | /products/:id |
| DELETE | /products/:id |

---

## Cart

| Method | Endpoint |
|---------|----------|
| POST | /cart |
| GET | /cart |
| DELETE | /cart/:productId |

---

## Orders

| Method | Endpoint |
|---------|----------|
| POST | /orders |
| GET | /orders |

---

## Admin

| Method | Endpoint |
|---------|----------|
| GET | /admin/orders |
| PUT | /orders/:id/status |

---

# ⚙️ Installation

## Clone the repository

```bash
git clone https://github.com/Jeffreydevs/ShopSphere.git
```

---

## Backend

```bash
cd backend
npm install
npm start
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

# 🎯 Future Improvements

- Product Search
- Category Filters
- Payment Gateway Integration
- Wishlist
- Product Reviews & Ratings
- Image Uploads
- Pagination
- Email Notifications

---

# 👨‍💻 Author

**Jeffrey**

GitHub:
https://github.com/Jeffreydevs

---

## ⭐ If you like this project, consider giving it a star!
