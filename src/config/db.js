const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
dotenv.config();

let pool;

const connectDB = async () => {
  try {
    pool = mysql.createPool({
      uri: process.env.DATABASE_URL,
    });

    try {
      const connection = await pool.getConnection();
      await connection.query(`
      CREATE TABLE IF NOT EXISTS organization (
        id INT AUTO_INCREMENT PRIMARY KEY,
        org_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

      await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        org_id INT NOT NULL,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (org_id) REFERENCES organization(id) ON DELETE CASCADE
      );
    `);

      await connection.query(`
      CREATE TABLE IF NOT EXISTS teams (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        team_name VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      
      )
      `);

      await connection.query(`
        CREATE TABLE IF NOT EXISTS employee (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        team_id INT NOT NULL,
        employee_name VARCHAR(250) NOT NULL,
        employee_email VARCHAR(50) NOT NULL,
        employee_designation VARCHAR(250) NOT NULL,
        employee_platform VARCHAR(50) NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
        )
        `);

      await connection.query(`CREATE TABLE IF NOT EXISTS employee_team (
        id INT AUTO_INCREMENT PRIMARY KEY,
        employee_id INT NOT NULL,
        team_id INT NOT NULL,
        FOREIGN KEY (employee_id) REFERENCES employee(id) ON DELETE CASCADE,
        FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE
        )
        `);

      await connection.query(`CREATE TABLE IF NOT EXISTS logs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        message VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
        `);

      connection.release();
      console.log("Connected to the database");
    } catch (err) {
      console.error("Failed to create users table", err);
    }
  } catch (err) {
    console.error("Failed to connect to database", err);
  }
};

module.exports = { connectDB, getPool: () => pool };
