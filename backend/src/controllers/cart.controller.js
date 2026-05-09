const Cart = require("../models/Cart");

// Add To Cart
const addToCart = async (req, res) => {
  try {
    const { bookId, quantity } = req.body;

    // Check Existing Cart Item
    const existingItem = await Cart.findOne({
      user: req.user._id,
      book: bookId,
    });

    if (existingItem) {
      existingItem.quantity += quantity || 1;

      await existingItem.save();

      return res.status(200).json({
        message: "Cart Updated",
        existingItem,
      });
    }

    // Create Cart Item
    const cartItem = await Cart.create({
      user: req.user._id,
      book: bookId,
      quantity,
    });

    res.status(201).json({
      success: true,
      message: "Book Added To Cart",
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Cart
const getCart = async (req, res) => {
  try {
    const cart = await Cart.find({
      user: req.user._id,
    }).populate("book");

    res.status(200).json({
      success: true,
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Remove Cart Item
const removeCartItem = async (req, res) => {
  try {
    await Cart.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Item Removed",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Quantity
const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;

    const cartItem = await Cart.findByIdAndUpdate(
      req.params.id,

      {
        quantity,
      },

      {
        new: true,
      },
    );

    res.status(200).json({
      success: true,
      cartItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addToCart,
  getCart,
  removeCartItem,
  updateQuantity,
};
