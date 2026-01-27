const loginForm = document.getElementById("loginForm");
const emailField = document.getElementById("emailField");
const passwordField = document.getElementById("passwordField");
const output = document.getElementById("output");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = emailField.value;
  const password = passwordField.value;

  output.innerText = "Sending credentials...";

  const response = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    output.innerText = "Invalid credentials.";
    return;
  }
  const data = await response.json();

  output.innerText = JSON.stringify(data, null, 2);
});
