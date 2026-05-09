const express = require("express");

const {
  createOrder,
  getMyOrders,
  getSellerOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/order.controller");

const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

// Create Order
router.post("/", authMiddleware, createOrder);

// My Orders
router.get("/my-orders", authMiddleware, getMyOrders);

// Seller Orders
router.get("/seller", authMiddleware, roleMiddleware("seller"), getSellerOrders);

// Single Order
router.get("/:id", authMiddleware, getSingleOrder);

// Admin Get All Orders
router.get("/admin/all", authMiddleware, roleMiddleware("admin"), getAllOrders);

// Update Order Status
router.put(
  "/admin/:id",
  authMiddleware,
  roleMiddleware("admin"),
  updateOrderStatus,
);

module.exports = router;
