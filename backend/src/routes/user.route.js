const express = require("express");

const roleMiddleware = require("../middleware/role.middleware");

const {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers,
  deleteUser,
  updateProfile,
  deleteOwnProfile,
} = require("../controllers/user.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);

// Profile Protected Route
router.get("/profile", authMiddleware, getProfile);

// Update Profile
router.put("/profile", authMiddleware, updateProfile);

// Delete Own Profile
router.delete("/profile", authMiddleware, deleteOwnProfile);

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

// Admin: Get All Users
router.get("/all", authMiddleware, roleMiddleware("admin"), getAllUsers);

// Admin: Delete User
router.delete("/:id", authMiddleware, roleMiddleware("admin"), deleteUser);

module.exports = router;
