const express = require("express");

const {

    addToCart,
    getCart,
    removeCartItem,
    updateQuantity

} = require("../controllers/cart.controller");

const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();


// Add To Cart
router.post("/", authMiddleware, addToCart);


// Get Cart
router.get("/", authMiddleware, getCart);


// Remove Item
router.delete("/:id", authMiddleware, removeCartItem);


// Update Quantity
router.put("/:id", authMiddleware, updateQuantity);


module.exports = router;