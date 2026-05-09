import { useState, useEffect } from "react";
import { FaBookOpen, FaUserCircle, FaShoppingCart, FaSearch, FaMoon, FaSun, FaBox } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) return;
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(`${API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartCount(response.data.cart.length);
      } catch (error) {
        console.error("Error fetching cart count:", error);
      }
    };

    fetchCart();
    
    window.addEventListener("cart-updated", fetchCart);
    window.addEventListener("storage", fetchCart);
    return () => {
      window.removeEventListener("cart-updated", fetchCart);
      window.removeEventListener("storage", fetchCart);
    };
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${searchQuery.trim()}`);
      setSearchQuery("");
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 px-8 py-4 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <FaBookOpen className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">BookStore</h1>
        </Link>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex-grow max-w-md relative hidden lg:block">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white border-none rounded-2xl py-3 pl-12 pr-4 outline-none focus:ring-2 focus:ring-blue-600 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </form>

        {/* Menu & Buttons */}
        <div className="flex items-center gap-8 shrink-0">
          <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
            <li>
              <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link>
            </li>
            <li>
              <Link to="/books" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">Books</Link>
            </li>
            {user && (
              <li>
                <Link to="/my-orders" className="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition flex items-center gap-2">
                   Orders
                </Link>
              </li>
            )}
            {user?.role === "seller" && (
              <li>
                <Link to="/seller-dashboard" className="text-blue-600 dark:text-blue-400 font-semibold">Dashboard</Link>
              </li>
            )}
          </ul>

          <div className="flex items-center gap-6">
            {/* Theme Toggle */}
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-yellow-400 hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition">
              <FaShoppingCart className="text-2xl" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-gray-900">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-200 font-medium">
                  <FaUserCircle className="text-2xl text-gray-400" />
                  <span className="hidden sm:inline">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition border border-red-100 dark:border-red-900/30 font-semibold"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-5 py-2 text-blue-600 dark:text-blue-400 font-semibold hover:text-blue-700 transition"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 dark:shadow-none transition font-semibold"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;