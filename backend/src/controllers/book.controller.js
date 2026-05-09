const Book = require("../models/Book");

// Add Book
const addBook = async (req, res) => {
  try {
    const { title, author, description, price, image, category, stock } =
      req.body;

    const book = await Book.create({
      title,
      author,
      description,
      price,
      image,
      category,
      stock,

      seller: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Book Added Successfully",
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Seller Books
const getSellerBooks = async (req, res) => {
  try {
    const books = await Book.find({ seller: req.user._id });

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate("seller", "name email");

    res.status(200).json({
      success: true,
      books,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Book
const getSingleBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    res.status(200).json({
      success: true,
      book,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Book
const updateBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    // Check ownership
    if (book.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        message: "You are not authorized to update this book",
      });
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Book Updated",
      updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Book
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({
        message: "Book Not Found",
      });
    }

    // Check ownership
    if (book.seller.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({
        message: "You are not authorized to delete this book",
      });
    }

    await book.deleteOne();

    res.status(200).json({
      success: true,
      message: "Book Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addBook,
  getBooks,
  getSellerBooks,
  getSingleBook,
  updateBook,
  deleteBook,
};
