# Secure JWT authentication API

Secure authentication API built with Node.js and Express using short-lived JWT access tokens and rotating refresh tokens stored in HttpOnly cookies.

## 🚀 Features

- JWT-based authentication
- Short-lived access tokens
- Rotating refresh token strategy
- Refresh tokens stored in HttpOnly cookies
- Session revocation on logout
- Protected routes using authentication middleware
- MySQL database persistence

## 🧱 Architecture

The project follows a layered architecture pattern to separate responsibilities:

- **Routes** handle HTTP requests and responses
- **Middleware** manages authentication and request validation
- **Repositories** handle database access and queries
- **Database** uses a MySQL connection pool for efficient data access

## 🔐 Authentication Flow

The authentication system uses a dual-token strategy:

### Login

- User credentials are validated
- A short-lived **access token** is issued
- A **refresh token** is generated and stored as an HttpOnly cookie
- The refresh token is persisted in the database

### Token Refresh

- The refresh token is validated against the database
- A new access token is issued
- The refresh token is rotated (replaced with a new one)

### Logout

- The refresh token is removed from the database
- The HttpOnly cookie is cleared, invalidating the session

## 🛠️ Tech Stack

- Node.js
- Express.js
- MySQL
- JSON Web Token (JWT)
- bcrypt
- cookie-parser
- dotenv

## 🔒 Security Decisions

This project applies several security practices commonly used in modern authentication systems:

- **Short-lived access tokens** reduce the impact of token leakage
- **Refresh tokens stored in HttpOnly cookies** help mitigate potential XSS attacks
- **Server-side refresh token storage** allows session revocation
- **Refresh token rotation** prevents reuse of compromised tokens
- **Authentication middleware** protects private routes

## ⚙️ Environment Variables

Create a `.env` file in the root of the backend project based on the provided `.env.example` file:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=

JWT_SECRET=
JWT_REFRESH_SECRET=
```

## ▶️ Running Locally

1. Clone the repository
2. Install dependencies

```bash
npm install
```

3. Create a `.env` file based on the environment variables section above
4. Start the server:

```bash
node src/server.js
```

The server will run on `http://localhost:3000`

## 📡 API Endpoints

| Method | Endpoint   | Description                 |
| ------ | ---------- | --------------------------- |
| POST   | /register  | Create a new user           |
| POST   | /login     | Authenticate user           |
| POST   | /refresh   | Refresh access token        |
| GET    | /protected | Example protected route     |
| GET    | /me        | Get authenticated user data |
| DELETE | /logout    | Logout and revoke session   |
