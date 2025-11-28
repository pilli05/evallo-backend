const authRepository = require("../repository/auth.repository");
const authService = require("../service/auth.service");

const authController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const existingUser = await authRepository.getUserByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const org_id = 1;
      const hashedPassword = await authService.hashPassword(password);
      const user = { org_id: org_id, name, email, password: hashedPassword };
      await authService.register(user);
      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await authRepository.getUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const isMatch = await authService.comparePassword(
        password,
        user.password
      );
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid Email or Password" });
      }
      const token = await authService.generateToken(user);
      res.status(200).json({ token: token, message: "Login successful" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = authController;
