import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

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

const refreshTokensDB = [];

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: "Email or password were not sent." });

  const user = usersFromDB.find((u) => u.email === email);
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

  refreshTokensDB.push(refreshToken);

  return res.status(200).json({ accessToken, refreshToken });
});

router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token not sent." });

  const exists = refreshTokensDB.find((token) => token === refreshToken);

  if (!exists)
    return res.status(401).json({ error: "Refresh token does not exists." });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const oldRefreshTokenIndex = refreshTokensDB.findIndex(
      (token) => token === refreshToken,
    );

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

    refreshTokensDB[oldRefreshTokenIndex] = newRefreshToken;

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
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const indexToken = refreshTokensDB.findIndex(
      (token) => token === refreshToken,
    );
    if (indexToken === -1)
      return res.status(401).json({ error: "Token does not exists." });

    refreshTokensDB.splice(indexToken, 1);

    return res.status(200).json({ message: "Logout realizado com sucesso!" });
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired refresh token." });
  }
});

export default router;
