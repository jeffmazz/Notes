import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authMiddleware } from "../middlewares/auth.middleware.js";

import { findUserByEmail } from "../repositories/user.repository.js";
import {
  saveRefreshToken,
  findRefreshToken,
  updateRefreshToken,
  deleteRefreshToken,
} from "../repositories/refreshToken.repository.js";

const router = Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email or password were not sent." });

  const user = await findUserByEmail(email);
  if (!user) return res.status(401).json({ error: "Invalid credentials." });

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch)
    return res.status(401).json({ error: "Invalid credentials." });

  const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });

  const refreshToken = jwt.sign(
    { userId: user.id },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "3m" },
  );

  await saveRefreshToken(refreshToken, user.id);

  return res.status(200).json({ accessToken, refreshToken });
});

router.post("/refresh", async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token not sent." });

  const storedToken = await findRefreshToken(refreshToken);

  if (!storedToken)
    return res.status(401).json({ error: "Refresh token does not exists." });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRET,
      { expiresIn: "1m" },
    );

    const newRefreshToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "3m" },
    );

    await updateRefreshToken(storedToken.id, newRefreshToken);

    return res
      .status(200)
      .json({ accessToken: newAccessToken, refreshToken: newRefreshToken });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired refresh token." });
  }
});

router.get("/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Access granted",
    userId: req.userId,
  });
});

router.delete("/logout", async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken)
    return res.status(400).json({ error: "Refresh token not sent." });

  try {
    const deleted = await deleteRefreshToken(refreshToken);

    if (!deleted)
      return res.status(401).json({ error: "Token does not exists." });

    return res.status(200).json({ message: "Logout realizado com sucesso!" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired refresh token." });
  }
});

export default router;
