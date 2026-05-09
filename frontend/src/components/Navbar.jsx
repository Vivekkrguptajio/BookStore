import { useState, useEffect } from "react";
import { FaBookOpen, FaUserCircle, FaShoppingCart, FaSearch, FaMoon, FaSun, FaShieldAlt, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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
    return () => window.removeEventListener("cart-updated", fetchCart);
  }, [token]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${searchQuery.trim()}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b dark:border-gray-800 px-4 md:px-6 py-4 sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="w-9 h-9 md:w-10 md:h-10 bg-blue-600 rounded-xl flex items-center justify-center">
            <FaBookOpen className="text-white text-lg md:text-xl" />
          </div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white tracking-tight">BookStore</h1>
        </Link>

        {/* Desktop Search Bar */}
        <form onSubmit={handleSearch} className="flex-grow max-w-md relative hidden md:block">
          <input
            type="text"
            placeholder="Search books..."
            className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white border border-transparent rounded-xl py-2 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-600 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
        </form>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* Desktop Menu */}
          <ul className="hidden lg:flex items-center gap-6 font-semibold text-gray-600 dark:text-gray-300 mr-4">
            <li><Link to="/" className="hover:text-blue-600 transition">Home</Link></li>
            <li><Link to="/books" className="hover:text-blue-600 transition">Books</Link></li>
            {user && <li><Link to="/my-orders" className="hover:text-blue-600 transition">Orders</Link></li>}
            {user?.role === "seller" && <li><Link to="/seller-dashboard" className="text-blue-600 dark:text-blue-400">Dashboard</Link></li>}
          </ul>

          <button onClick={() => setDarkMode(!darkMode)} className="p-2 md:p-2.5 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-600 dark:text-yellow-400">
            {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
          </button>

          <Link to="/cart" className="relative p-2 md:p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition">
            <FaShoppingCart className="text-xl md:text-2xl text-gray-600 dark:text-gray-300" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-600 text-white text-[10px] font-bold w-4 h-4 md:w-5 md:h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Desktop User Section */}
          <div className="hidden md:flex items-center gap-3 ml-2 border-l pl-4 dark:border-gray-800">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center gap-2 font-bold text-gray-700 dark:text-gray-200">
                  <FaUserCircle className="text-2xl text-gray-400" />
                  <span className="hidden sm:inline">{user.name.split(' ')[0]}</span>
                </Link>
                <button onClick={handleLogout} className="text-xs font-bold text-red-500 uppercase">Logout</button>
              </>
            ) : (
              <Link to="/login" className="px-5 py-2 bg-blue-600 text-white rounded-xl font-bold">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-gray-600 dark:text-gray-300"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white dark:bg-gray-900 border-b dark:border-gray-800 p-6 space-y-6 shadow-xl transition-all">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full bg-gray-100 dark:bg-gray-800 dark:text-white rounded-xl py-3 pl-11 pr-4 outline-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </form>

          <ul className="space-y-4 font-bold text-lg text-gray-700 dark:text-gray-200">
            <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
            <li><Link to="/books" onClick={() => setIsMenuOpen(false)}>Books</Link></li>
            {user && <li><Link to="/my-orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link></li>}
            {user?.role === "seller" && <li><Link to="/seller-dashboard" onClick={() => setIsMenuOpen(false)} className="text-blue-600">Seller Dashboard</Link></li>}
            {user?.role === "admin" && <li><Link to="/admin" onClick={() => setIsMenuOpen(false)} className="text-purple-600">Admin Panel</Link></li>}
            <li><Link to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link></li>
          </ul>

          <div className="pt-6 border-t dark:border-gray-800">
            {user ? (
              <button 
                onClick={handleLogout}
                className="w-full py-4 bg-red-50 dark:bg-red-900/20 text-red-600 font-bold rounded-xl"
              >
                Logout Account
              </button>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-4 bg-blue-600 text-white text-center font-bold rounded-xl"
              >
                Login / Sign Up
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;