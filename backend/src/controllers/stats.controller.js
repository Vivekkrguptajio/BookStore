const Book = require("../models/Book");
const Order = require("../models/Order");
const User = require("../models/User");

const getSellerStats = async (req, res) => {
  try {
    const sellerId = req.user._id;

    // Total Books
    const totalBooks = await Book.countDocuments({ seller: sellerId });

    // Total Orders and Revenue
    const sellerBooks = await Book.find({ seller: sellerId });
    const bookIds = sellerBooks.map(book => book._id.toString());

    const orders = await Order.find({
      "orderItems.book": { $in: bookIds }
    }).populate("orderItems.book");

    let totalOrders = orders.length;
    let totalRevenue = 0;
    let uniqueCustomers = new Set();

    orders.forEach(order => {
      uniqueCustomers.add(order.user.toString());
      order.orderItems.forEach(item => {
        if (bookIds.includes(item.book._id.toString())) {
          totalRevenue += item.price * item.quantity;
        }
      });
    });

    res.status(200).json({
      success: true,
      stats: {
        totalBooks,
        totalOrders,
        totalRevenue,
        totalCustomers: uniqueCustomers.size,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAdminStats = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments({ role: "user" });
    const totalSellers = await User.countDocuments({ role: "seller" });
    
    const allOrders = await Order.find();
    const totalRevenue = allOrders.reduce((acc, order) => acc + order.totalPrice, 0);

    res.status(200).json({
      success: true,
      stats: {
        totalBooks,
        totalOrders,
        totalUsers,
        totalSellers,
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getSellerStats,
  getAdminStats,
};
