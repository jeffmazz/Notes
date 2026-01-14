import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

import { authMiddleware } from "./auth.middleware.js";

const app = express();
app.use(express.json());

const usersFromDB = [
  {
    id: 1,
    email: "teste@email.com",
    password: await bcrypt.hash("123456", 10),
  },
  {
    id: 2,
    email: "admin@email.com",
    password: await bcrypt.hash("admin123", 10),
  },
];

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email or password were not sent." });

  const user = usersFromDB.find((u) => u.email === email);
  if (!user) return res.status(401).json({ error: "Invalid credentials." });

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch)
    return res.status(401).json({ error: "Invalid credentials." });

  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  return res.json({ token });
});

app.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.userId,
  });
});

app.listen(3000, () => {
  console.log("Server running!");
});
