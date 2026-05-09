const jwt = require("jsonwebtoken");

const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Token
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "No Token Provided",
      });
    }

    // Bearer token
    const token = authHeader.split(" ")[1];

    // Verify Token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find User
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User Not Found",
      });
    }

    // Add User To Request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = authMiddleware;
