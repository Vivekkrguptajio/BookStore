const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Book = require("../models/Book");

// Create Order
const createOrder = async (req, res) => {
  try {
    // User Cart
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("book");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is Empty",
      });
    }

    // Order Items
    const orderItems = cartItems.map((item) => ({
      book: item.book._id,
      quantity: item.quantity,
      price: item.book.price,
    }));

    // Total Price
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.book.price * item.quantity,

      0,
    );

    // Create Order
    const order = await Order.create({
      user: req.user._id,
      orderItems,
      totalPrice,
    });

    // Clear Cart
    await Cart.deleteMany({
      user: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Order Created",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get My Orders
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).populate("orderItems.book");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Seller Orders
const getSellerOrders = async (req, res) => {
  try {
    const sellerBooks = await Book.find({ seller: req.user._id });
    const bookIds = sellerBooks.map((book) => book._id);

    const orders = await Order.find({
      "orderItems.book": { $in: bookIds },
    })
      .populate("orderItems.book")
      .populate("user", "name email");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Order
const getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("orderItems.book")
      .populate("user", "name email");

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin Get All Orders
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user", "name email");

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "Order Not Found",
      });
    }

    order.orderStatus = req.body.orderStatus;

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order Updated",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getMyOrders,
  getSellerOrders,
  getSingleOrder,
  getAllOrders,
  updateOrderStatus,
};
