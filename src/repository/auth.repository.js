const { getPool } = require("../config/db");

const authRepository = {
  getUserByEmail: async (email) => {
    const pool = getPool();
    const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  },

  registerUser: async (user) => {
    const pool = getPool();
    const { org_id, name, email, password } = user;
    const [result] = await pool.query(
      "INSERT INTO users (org_id, name, email, password) VALUES (?, ?, ?, ?)",
      [org_id, name, email, password]
    );
    return result;
  },
};

module.exports = authRepository;
