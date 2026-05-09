const express = require("express");
const { getSellerStats } = require("../controllers/stats.controller");
const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

router.get("/seller", authMiddleware, roleMiddleware("seller"), getSellerStats);

module.exports = router;
