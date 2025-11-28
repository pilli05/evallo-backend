const { getPool } = require("../config/db");
const moment = require("moment");

const logsHelper = async (userId, userName, text) => {
  const timestamp = moment().format("YYYY-MM-DD HH:mm");
  const message = `[${timestamp}] User '${userName}' ${text}.`;
  const pool = getPool();
  const [rows] = await pool.query(
    `INSERT INTO logs (user_id,  message) VALUES (?, ?)`,
    [userId, message]
  );
  return rows;
};

module.exports = logsHelper;
