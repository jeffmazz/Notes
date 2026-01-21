import { pool } from "../database/connection.js";

export async function findUserByEmail(email) {
  const [rows] = await pool.execute(
    "SELECT id, email, password FROM users WHERE email = ?",
    [email],
  );

  return rows[0];
}
