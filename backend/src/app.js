const express = require("express");
const cors = require("cors");

const userRoutes = require("./routes/user.route");
const bookRoutes = require("./routes/book.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");
const statsRoutes = require("./routes/stats.routes");

const app = express();

// ======================
// Middlewares
// ======================

// Frontend aur backend connect karne ke liye
app.use(cors());

// Frontend se JSON data read karne ke liye
app.use(express.json());


// ======================
// Routes
// ======================

// Base Route
app.get("/", (req, res) => {
    res.send("Server is running...");
});

// User Route
app.use("/api/users", userRoutes);

//Book Route
app.use("/api/books", bookRoutes);

//Cart Route
app.use("/api/cart", cartRoutes);

//Order Route
app.use("/api/orders", orderRoutes);

//Payemnt Route
app.use("/api/payment", paymentRoutes);

//Stats Route
app.use("/api/stats", statsRoutes);

// ======================
// Export App
// ======================

module.exports = app;