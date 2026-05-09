const express = require("express");
const { getSellerStats, getAdminStats } = require("../controllers/stats.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get("/seller", authMiddleware, roleMiddleware("seller"), getSellerStats);
router.get("/admin", authMiddleware, roleMiddleware("admin"), getAdminStats);

module.exports = router;
