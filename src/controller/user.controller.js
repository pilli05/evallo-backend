const logsHelper = require("../helper/logs");
const userRepository = require("../repository/user.repository");
const userService = require("../service/user.service");

const userController = {
  createTeam: async (req, res) => {
    const { teamName } = req.body;
    const userId = req.user.id;
    const team = { userId, teamName };

    await userService.createTeam(team);
    await logsHelper(userId, req.user.name, `created a team ${teamName}`);
    res.status(201).json({ message: "Team created successfully" });
  },

  getTeams: async (req, res) => {
    const userId = req.user.id;
    const teams = await userService.getTeams(userId);
    res.status(200).json({
      message: "Teams fetched successfully",
      teams: teams,
    });
  },

  getTeamById: async (req, res) => {
    const teamId = req.params.id;
    const team = await userService.getTeamById(teamId);
    res.status(200).json({ message: "Team fetched successfully", team: team });
  },

  updateTeams: async (req, res) => {
    const { teamId, teamName } = req.body;
    const userId = req.user.id;
    await userService.updateTeams(teamId, teamName);
    await logsHelper(userId, req.user.name, `updated to team ${teamName}`);
    res.status(200).json({ message: "Team updated successfully" });
  },

  deleteTeam: async (req, res) => {
    const teamId = req.params.id;
    const userId = req.user.id;
    await userService.deleteTeam(teamId);
    await logsHelper(userId, req.user.name, `deleted a team ${teamId}`);
    res.status(200).json({ message: "Team deleted successfully" });
  },

  createEmployee: async (req, res) => {
    const userId = req.user.id;
    const {
      employeeName,
      employeeEmail,
      employeeDesignation,
      employeePlatform,
      teamId,
    } = req.body;
    const employee = {
      userId,
      employeeName,
      employeeEmail,
      employeeDesignation,
      employeePlatform,
      teamId,
    };

    const employeeExist = await userRepository.getEmployeeByEmail(
      employee.employeeEmail,
      userId
    );

    if (employeeExist) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }
    await userService.createEmployee(employee);
    await logsHelper(
      userId,
      req.user.name,
      `created a employee ${employeeName}`
    );
    res.status(201).json({ message: "Employee created successfully" });
  },

  getEmployee: async (req, res) => {
    const userId = req.user.id;
    const result = await userService.getEmployee(userId);
    res
      .status(200)
      .json({ message: "Employees fetches successfully", employee: result });
  },

  getEmployeeById: async (req, res) => {
    const employeeId = req.params.id;
    const result = await userRepository.getEmployeeById(employeeId);
    res
      .status(200)
      .json({ message: "Employees fetches successfully", employee: result });
  },

  updateEmployee: async (req, res) => {
    const {
      teamId,
      employeeId,
      employeeName,
      employeeEmail,
      employeeDesignation,
      employeePlatform,
    } = req.body;
    const userId = req.user.id;
    await userService.updateEmployee(
      teamId,
      userId,
      employeeId,
      employeeName,
      employeeEmail,
      employeeDesignation,
      employeePlatform
    );
    await logsHelper(
      userId,
      req.user.name,
      `updated a employee ${employeeName}`
    );
    res.status(200).json({ message: "Employee updated successfully" });
  },

  deleteEmployee: async (req, res) => {
    const userId = req.user.id;
    const employeeId = req.params.id;
    await userService.deleteEmployee(employeeId);
    await logsHelper(
      userId,
      req.user.name,
      `deleted to employee ${employeeId}`
    );
    res.status(200).json({ message: "Employee deleted successfully" });
  },

  getLogs: async (req, res) => {
    const userId = req.user.id;
    const result = await userRepository.getLogs(userId);
    res
      .status(200)
      .json({ message: "Logs fetches successfully", logs: result });
  },

  getEmployeeTeam: async (req, res) => {
    const userId = req.user.id;
    const result = await userRepository.getEmployeeTeam(userId);
    res
      .status(200)
      .json({ message: "Employees fetches successfully", employee: result });
  },
};

module.exports = userController;
