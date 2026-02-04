import { pool } from "../database/connection.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    "SELECT id, email, password FROM users WHERE email = ?",
    [email],
  );

  return rows[0];
}

export async function findUserById(id) {
  const [rows] = await pool.execute(
    "SELECT id, email FROM users WHERE id = ?",
    [id],
  );

  return rows[0];
}
