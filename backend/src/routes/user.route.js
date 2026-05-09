const express = require("express");

const roleMiddleware = require("../middleware/role.middleware");

const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile Protected Route
router.get("/profile", authMiddleware, getProfile);

router.get(
    "/seller-dashboard",
    authMiddleware,
    roleMiddleware("seller", "admin"),
    (req, res) => {

        res.json({
            message: "Welcome Seller"
        });

    }
);

router.get(
    "/admin-dashboard",
    authMiddleware,
    roleMiddleware("admin"),
    (req, res) => {

        res.json({
            message: "Welcome Admin"
        });

    }
);

module.exports = router;
