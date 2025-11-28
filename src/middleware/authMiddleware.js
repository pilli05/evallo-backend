const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("authorization")?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  try {
    const decodedToken = jwt.verify(token, "evallo-secret-key");
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token is not valid" });
  }
};

module.exports = authMiddleware;
