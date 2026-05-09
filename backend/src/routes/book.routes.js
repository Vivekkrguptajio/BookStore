const express = require("express");

const {
  addBook,
  getBooks,
  getSellerBooks,
  getSingleBook,
  updateBook,
  deleteBook,
} = require("../controllers/book.controller");

const authMiddleware = require("../middleware/auth.middleware");

const roleMiddleware = require("../middleware/role.middleware");

const router = express.Router();

// Add Book
router.post("/", authMiddleware, roleMiddleware("seller", "admin"), addBook);

// Get All Books
router.get("/", getBooks);

// Get Seller Books
router.get("/seller", authMiddleware, roleMiddleware("seller"), getSellerBooks);

// Get Single Book
router.get("/:id", getSingleBook);

// Update Book
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware("seller", "admin"),
  updateBook,
);

// Delete Book
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("seller", "admin"),
  deleteBook,
);

module.exports = router;
