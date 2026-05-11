import { FaStar, FaPlus, FaCartPlus } from "react-icons/fa";
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
      // Using a custom event for silent updates or can use a toast library if available
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div 
      onClick={() => navigate(`/books/${book._id}`)}
      className="card-premium group flex flex-col h-full cursor-pointer relative overflow-hidden"
    >
      {/* Image Area */}
      <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden mb-5">
        <img
          src={book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"}
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
           <button 
             onClick={handleAddToCart}
             className="bg-white text-blue-600 p-4 rounded-2xl shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-blue-600 hover:text-white"
           >
             <FaCartPlus size={20} />
           </button>
        </div>

        {book.category && (
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 border border-white/20">
            {book.category}
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex flex-col flex-grow">
        <div className="flex justify-between items-start gap-2 mb-2">
          <h2 className="text-lg font-bold text-slate-800 dark:text-white line-clamp-1 group-hover:text-blue-600 transition-colors">
            {book.title}
          </h2>
          <div className="flex items-center gap-1.5 px-2 py-1 bg-yellow-400/10 text-yellow-600 dark:text-yellow-400 rounded-lg text-xs font-black">
            <FaStar className="mb-0.5" />
            <span>{book.rating || 4.5}</span>
          </div>
        </div>

        <p className="text-slate-500 dark:text-slate-400 text-sm mb-4 line-clamp-1">
          by <span className="font-semibold text-slate-700 dark:text-slate-200">{book.author}</span>
        </p>

        <div className="mt-auto pt-4 border-t border-slate-50 dark:border-white/5 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Price</span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              ₹{book.price}
            </h3>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-10 h-10 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all active:scale-90"
          >
            <FaPlus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;