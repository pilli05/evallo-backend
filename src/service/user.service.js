const userRepository = require("../repository/user.repository");

const userService = {
  getUserProfile: async (userId) => {
    const user = await userRepository.getUserById(userId);
    return user;
  },

  createTeam: async (team) => {
    const result = await userRepository.createTeam(team);
    return result;
  },

  getTeams: async (userId) => {
    const teams = await userRepository.getTeams(userId);
    return teams;
  },

  updateTeams: async (teamId, teamName) => {
    await userRepository.updateTeams(teamId, teamName);
    return;
  },

  getTeamById: async (teamId) => {
    const team = await userRepository.getTeamById(teamId);
    return team;
  },

  deleteTeam: async (teamId) => {
    await userRepository.deleteTeam(teamId);
    return;
  },

  createEmployee: async (employee) => {
    await userRepository.createEmployee(employee);
    return;
  },

  getEmployee: async (userId) => {
    const employee = await userRepository.getEmployee(userId);
    return employee;
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
    await userRepository.updateEmployee(
      teamId,
      userId,
      employeeId,
      employeeName,
      employeeEmail,
      employeeDesignation,
      employeePlatform
    );
    return;
  },

  deleteEmployee: async (employeeId) => {
    await userRepository.deleteEmployee(employeeId);
    return;
  },
};

module.exports = userService;
