const loginForm = document.getElementById("loginForm");
const emailField = document.getElementById("emailField");
const passwordField = document.getElementById("passwordField");
const output = document.getElementById("output");
const btnProtected = document.getElementById("btnProtected");
const btnLogout = document.getElementById("btnLogout");

let accessToken = null;

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailField.value;
  const password = passwordField.value;

  output.innerText = "Sending credentials...";

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const err = await response.json();
    output.innerText = err.error;
    return;
  }
  const data = await response.json();

  accessToken = data.accessToken;

  output.innerText = "Login successful! Tokens stored.";
});

const refreshAccessToken = async () => {
  output.innerText = "Refreshing token...";

  const response = await fetch("http://localhost:3000/refresh", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    output.innerText = "Refresh failed. Please login again.";
    return false;
  }

  const data = await response.json();

  console.log("Refresh Response: ", data);

  accessToken = data.accessToken;

  output.innerText = "Token refreshed!";
  return true;
};

btnProtected.addEventListener("click", async () => {
  output.innerText = "accessing protected route...";

  const response = await fetch("http://localhost:3000/protected", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (response.status === 401) {
    const refreshed = await refreshAccessToken();

    console.log("Refreshed? ", refreshed);

    if (!refreshed) return;

    console.log("New Access: ", accessToken);

    const retryResponse = await fetch("http://localhost:3000/protected", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const retryData = await retryResponse.json();
    output.innerText = JSON.stringify(retryData, null, 2);

    return;
  }

  const data = await response.json();

  output.innerText = JSON.stringify(data, null, 2);
});

btnLogout.addEventListener("click", async () => {
  output.innerText = "Loggint out...";

  const response = await fetch("http://localhost:3000/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refreshToken: refreshToken,
    }),
  });

  if (!response.ok) {
    output.innerText = "Logout failed.";
    return;
  }

  accessToken = null;
  refreshToken = null;

  output.innerText = "logged out successfully!";
});
