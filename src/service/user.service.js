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

  createEmployee: async (employee) => {
    await userRepository.createEmployee(employee);
    return;
  },
};

module.exports = userService;
