# Frontend – Auth With JWT

This is a simple frontend interface created to test authentication using:

- Access Token (short-lived)
- Refresh Token (stored in HttpOnly cookies)
- Protected routes
- Automatic token refresh

---

## Features

- Login with email and password
- Store access token in memory
- Access protected route using Bearer token
- Refresh access token when expired
- Logout clears refresh cookie

---

## Tech Stack

- HTML
- CSS
- JavaScript (Fetch API)

---

## How to Run

Open the file directly:

```bash
open index.html
```

Or use Live Server on VS Code.

## Authentication Flow

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

if access expires, frontend calls:

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

---

Made with ❤️ for study purposes.
