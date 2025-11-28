const authRepository = require("../repository/auth.repository");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authService = {
  hashPassword: async (password) => {
    return bcrypt.hash(password, 10);
  },

  comparePassword: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },

  generateToken: async (user) => {
    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        org_id: user.org_id,
      },
      "evallo-secret-key",
      {
        expiresIn: "12h",
      }
    );
    return token;
  },

  register: async (userData) => {
    console.log(typeof userData.org_id);
    await authRepository.registerUser(userData);
  },
};

module.exports = authService;
