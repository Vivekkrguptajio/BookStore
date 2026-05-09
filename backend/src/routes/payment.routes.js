const express = require("express");

const { createCheckoutSession } = require("../controllers/payment.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

// Checkout
router.post("/checkout", authMiddleware, createCheckoutSession);

module.exports = router;
