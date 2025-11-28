const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const userService = require("../service/user.service");
const userController = require("../controller/user.controller");
const userRepository = require("../repository/user.repository");
const userRouter = express.Router();

userRouter.get("/profile", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const result = await userRepository.getUserById(userId);
  res.status(200).json({ message: "User profile accessed", user: result });
});

userRouter.post("/createTeam", authMiddleware, userController.createTeam);

userRouter.get("/teams", authMiddleware, userController.getTeams);

userRouter.get("/teams/:id", authMiddleware, userController.getTeamById);

userRouter.put("/teams/update", authMiddleware, userController.updateTeams);

userRouter.post(
  "/createEmployee",
  authMiddleware,
  userController.createEmployee
);

userRouter.get("/employee", authMiddleware, userController.getEmployee);

userRouter.get("/employeeTeam", authMiddleware, userController.getEmployeeTeam);

module.exports = userRouter;
