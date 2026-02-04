import { pool } from "../database/connection.js";

export async function saveRefreshToken(token, userId) {
  await pool.execute(
    "INSERT INTO refresh_tokens (token, user_id) VALUES (?, ?)",
    [token, userId],
  );
}

export async function findRefreshToken(token) {
  const [rows] = await pool.execute(
    "SELECT id, user_id FROM refresh_tokens WHERE token = ?",
    [token],
  );

  return rows[0];
}

export async function updateRefreshToken(id, newToken) {
  await pool.execute("UPDATE refresh_tokens SET token = ? WHERE id = ?", [
    newToken,
    id,
  ]);
}

export async function deleteRefreshToken(token) {
  const [result] = await pool.execute(
    "DELETE FROM refresh_tokens WHERE token = ?",
    [token],
  );

  return result.affectedRows;
}

export async function deleteRefreshTokensByUser(userId) {
  await pool.execute("DELETE FROM refresh_tokens WHERE user_id = ?", [userId]);
}
