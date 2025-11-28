const { getPool } = require("../config/db");

const userRepository = {
  getUserById: async (userId) => {
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT * FROM users u JOIN organization o ON u.org_id = o.id WHERE u.id = ?`,
      [userId]
    );
    return rows[0];
  },

  getUserDataById: async (userId) => {
    const pool = getPool();
    const [rows] = await pool.query(`SELECT * FROM users WHERE id = ?`, [
      userId,
    ]);
    return rows[0];
  },

  createTeam: async (team) => {
    const { userId, teamName } = team;
    const pool = getPool();
    const [rows] = await pool.query(
      `INSERT INTO teams (user_id, team_name) VALUES (?, ?)`,
      [userId, teamName]
    );
    return rows[0];
  },

  getTeams: async (userId) => {
    const pool = getPool();
    const [teams] = await pool.query(`SELECT * FROM teams WHERE user_id = ?`, [
      userId,
    ]);

    const [counts] = await pool.query(
      `SELECT teams.id, teams.team_name, COUNT(employee.id) AS teams_count FROM teams LEFT JOIN employee ON employee.team_id = teams.id WHERE teams.user_id = ? GROUP BY teams.id ORDER BY teams.id`,
      [userId]
    );

    const mergedTeams = teams.map((team) => {
      const count = counts.find((c) => Number(c.id) === Number(team.id));
      return {
        ...team,
        teams_count: count ? count.teams_count : 0,
      };
    });

    return mergedTeams;
  },

  getTeamById: async (teamId) => {
    const pool = getPool();
    const [rows] = await pool.query(`SELECT * FROM teams WHERE id = ?`, [
      teamId,
    ]);
    return rows[0];
  },

  updateTeams: async (teamId, teamName) => {
    const pool = getPool();
    const [rows] = await pool.query(
      `UPDATE teams SET team_name = ? WHERE id = ?`,
      [teamName, teamId]
    );
    return rows;
  },

  deleteTeam: async (teamId) => {
    const pool = getPool();
    const [rows] = await pool.query(`DELETE FROM teams WHERE id = ?`, [teamId]);
    return rows;
  },

  createEmployee: async (employee) => {
    const pool = getPool();
    const {
      userId,
      employeeName,
      employeeEmail,
      employeeDesignation,
      employeePlatform,
      teamId,
    } = employee;
    const [rows] = await pool.query(
      `INSERT INTO employee (user_id, team_id, employee_name, employee_email, employee_designation, employee_platform) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        userId,
        teamId,
        employeeName,
        employeeEmail,
        employeeDesignation,
        employeePlatform,
      ]
    );
    return rows;
  },

  getEmployeeByEmail: async (emailId, userId) => {
    const pool = getPool();
    const [rows] = await pool.query(
      `
      SELECT * FROM employee WHERE employee_email = ? AND user_id = ? 
      `,
      [emailId, userId]
    );
    return rows[0];
  },

  getEmployee: async (userId) => {
    const pool = getPool();
    const [rows] = await pool.query(
      `SELECT * FROM employee WHERE user_id = ?`,
      [userId]
    );
    return rows;
  },

  getEmployeeById: async (employeeId) => {
    const pool = getPool();
    const [rows] = await pool.query(`SELECT * FROM employee WHERE id = ?`, [
      employeeId,
    ]);
    return rows[0];
  },

  updateEmployee: async (
    teamId,
    userId,
    employeeId,
    employeeName,
    employeeEmail,
    employeeDesignation,
    employeePlatform
  ) => {
    const pool = getPool();
    const [rows] = await pool.query(
      `UPDATE employee SET team_id = ?, user_id = ?, employee_name = ?, employee_email = ?, employee_designation = ?, employee_platform = ? WHERE id = ?`,
      [
        teamId,
        userId,
        employeeName,
        employeeEmail,
        employeeDesignation,
        employeePlatform,
        employeeId,
      ]
    );
    return rows;
  },

  deleteEmployee: async (employeeId) => {
    const pool = getPool();
    const [rows] = await pool.query(`DELETE FROM employee WHERE id = ?`, [
      employeeId,
    ]);
    return rows;
  },

  getEmployeeTeam: async (userId) => {
    const pool = getPool();
    const [rows] = await pool.query(
      ` SELECT 
      t.id,
      t.team_name,
      t.created_at,
      COUNT(et.employee_id) AS member_count
    FROM teams t
    LEFT JOIN employee_team et ON t.id = et.team_id
    WHERE t.user_id = ?
    GROUP BY t.id, t.team_name, t.created_at
    ORDER BY t.id DESC`,
      [userId]
    );
    return rows;
  },
};

module.exports = userRepository;
