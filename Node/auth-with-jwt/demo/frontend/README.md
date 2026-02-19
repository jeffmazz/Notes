# JWT Authentication Demo Client

This frontend application is a simple client used to demonstrate and test the authentication flow implemented in the Secure JWT Authentication API.

It simulates how a real application handles login, protected requests, automatic token refresh, and logout using short-lived access tokens and HttpOnly refresh cookies.

⚠️ This client requires the backend API to be running locally.

The client demonstrates:

- Access Token (short-lived)
- Refresh Token (stored in HttpOnly cookies)
- Protected routes
- Automatic token refresh

---

## 🚀 Features

- Login with email and password
- Access token stored in memory (not persisted)
- Access protected route using Bearer authentication
- Automatic access token refresh when expired
- Logout invalidates session and clears refresh cookie

---

## 🛠️ Tech Stack

- HTML
- CSS
- JavaScript (Fetch API)

---

## ▶️ Running Locally

Open the `index.html` file directly in your browser:

```bash
open index.html
```

Or use Live Server on VS Code.

## 🔐 Authentication Flow

### Login

```js
fetch("/login", {
  method: "POST",
  credentials: "include",
});
```

### Protected Route

```js
fetch("/protected", {
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
});
```

### Refresh Token

When the access token expires, the frontend automatically calls:

```js
fetch("/refresh", {
  method: "POST",
  credentials: "include",
});
```

### Logout

```js
fetch("/logout", {
  method: "DELETE",
  credentials: "include",
});
```
