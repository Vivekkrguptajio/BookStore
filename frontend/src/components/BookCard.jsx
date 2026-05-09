import { FaStar, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to add books to cart");
      navigate("/login");
      return;
    }

    const API_URL = import.meta.env.VITE_API_URL;
    try {
      await axios.post(
        `${API_URL}/cart`,
        { bookId: book._id, quantity: 1 },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Added to cart successfully!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-none border border-transparent dark:border-gray-700 overflow-hidden hover:scale-105 transition duration-300">
      {/* Image */}
      <img
        src={book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"}
        alt={book.title}
        className="h-72 w-full object-cover"
      />

      {/* Content */}
      <div className="p-5">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1">
          {book.title}
        </h2>

        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {book.author}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3 text-yellow-500">
          <FaStar />
          <span>{book.rating || 4.5}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-5">
          <h3 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            ₹{book.price}
          </h3>

          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 dark:hover:bg-blue-500 transition"
          >
            <FaShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;