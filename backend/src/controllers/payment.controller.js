const stripe = require("../config/stripe");

const Cart = require("../models/Cart");

// Checkout Session
const createCheckoutSession = async (req, res) => {
  try {
    const cartItems = await Cart.find({
      user: req.user._id,
    }).populate("book");

    if (cartItems.length === 0) {
      return res.status(400).json({
        message: "Cart is Empty",
      });
    }

    const line_items = cartItems.map((item) => ({
      price_data: {
        currency: "inr",

        product_data: {
          name: item.book.title,
          description: item.book.description,
        },

        unit_amount: item.book.price * 100,
      },

      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],

      line_items,

      mode: "payment",

      success_url: "http://localhost:5173/success",

      cancel_url: "http://localhost:5173/cancel",
    });

    res.status(200).json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createCheckoutSession,
};
