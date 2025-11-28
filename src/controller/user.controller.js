const userRepository = require("../repository/user.repository");
const userService = require("../service/user.service");

const userController = {
  createTeam: async (req, res) => {
    const { teamName } = req.body;
    const userId = req.user.id;
    const team = { userId, teamName };

    await userService.createTeam(team);
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
    const team = await userRepository.getTeamById(teamId);
    res.status(200).json({ message: "Team fetched successfully", team: team });
  },

  updateTeams: async (req, res) => {
    const { teamId, teamName } = req.body;
    await userService.updateTeams(teamId, teamName);
    res.status(200).json({ message: "Team updated successfully" });
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
    res.status(201).json({ message: "Employee created successfully" });
  },

  getEmployee: async (req, res) => {
    const userId = req.user.id;
    const result = await userRepository.getEmployee(userId);
    res
      .status(200)
      .json({ message: "Employees fetches successfully", employee: result });
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
