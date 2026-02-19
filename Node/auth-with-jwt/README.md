# 🔐 Secure JWT Authentication System

![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)
![Express](https://img.shields.io/badge/Express.js-Backend-black?logo=express)
![JWT](https://img.shields.io/badge/Auth-JWT-blue?logo=jsonwebtokens)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange?logo=mysql)
![Status](https://img.shields.io/badge/status-active-success)

A complete authentication system demonstrating secure JWT-based authentication using a Node.js backend API and a frontend demo client.

This project showcases modern authentication practices such as short-lived access tokens, rotating refresh tokens stored in HttpOnly cookies, protected routes, and automatic session renewal.

---

## 🧩 Project Structure

```bash
auth-with-jwt/
└── demo/
    ├── backend/
    └── frontend/
```

## ⚙️ How It Works

1. The user logs in through the frontend demo client.
2. The backend validates credentials and issues:
   - a short-lived **access token**
   - a **refresh token** stored in an HttpOnly cookie
3. Protected requests use the access token.
4. When the access token expires, the frontend automatically requests a new one using the refresh token.
5. Logout revokes the session by removing the refresh token.

---

## ▶️ Running the Project

### 1️⃣ Start the Backend

```bash
cd demo/backend
npm install
node src/server.js
```

The API runs at: `http://localhost:3000`

### 2️⃣ Start the Frontend

```bash
cd demo/frontend
open index.html
```

Or run using Live Server in VS Code.

---

## 📚 Documentation

Each part of the system contains detailed documentation:

- 👉 [Backend Documentation](./demo/backend/README.md)
- 👉 [Frontend Demo Client](./demo/frontend/README.md)

## 🎯 Purpose

This project was built to demonstrate real-world authentication concepts, including:

- JWT authentication
- Access & Refresh token strategy
- HttpOnly cookie security
- Refresh token rotation
- Session revocation
- Client-side token handling

Built as a practical reference for modern JWT authentication systems.
