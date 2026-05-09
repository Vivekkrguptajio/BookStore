import { FaStar, FaPlus } from "react-icons/fa";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function BookCard({ book }) {
  const navigate = useNavigate();

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
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
      alert("Added to cart!");
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl md:rounded-2xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all group flex flex-col h-full">
      {/* Image Area */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"}
          alt={book.title}
          className="w-full h-full object-cover transition-transform group-hover:scale-105"
        />
        {book.category && (
          <div className="absolute top-2 left-2 md:top-4 md:left-4 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-2 md:px-3 py-0.5 md:py-1 rounded-md md:rounded-lg text-[8px] md:text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            {book.category}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="p-3 md:p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-1 mb-1 md:mb-2">
          <h2 className="text-sm md:text-lg font-bold text-gray-800 dark:text-white line-clamp-1">
            {book.title}
          </h2>
          <div className="flex items-center gap-1 text-yellow-500 font-bold text-[10px] md:text-sm">
            <FaStar size={10} />
            <span>{book.rating || 4.5}</span>
          </div>
        </div>

        <p className="text-gray-500 dark:text-gray-400 text-[10px] md:text-sm mb-2 md:mb-4 line-clamp-1">
          by <span className="font-medium text-gray-700 dark:text-gray-300">{book.author}</span>
        </p>

        <div className="mt-auto pt-2 md:pt-4 border-t border-gray-50 dark:border-gray-800 flex items-center justify-between">
          <h3 className="text-base md:text-2xl font-black text-blue-600 dark:text-blue-400">
            ₹{book.price}
          </h3>
          
          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white p-2 md:p-3 rounded-lg md:rounded-xl hover:bg-blue-700 transition"
          >
            <FaPlus size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;