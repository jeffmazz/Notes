import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader)
    return res.status(401).json({ error: "Token not provided." });

  const parts = authHeader.split(" ");
  if (parts.length !== 2)
    return res.status(401).json({ error: "Invalid token format." });
  const token = parts[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token." });
  }
};
