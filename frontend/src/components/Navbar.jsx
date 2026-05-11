import { useState, useEffect } from "react";
import { FaBookOpen, FaUserCircle, FaShoppingCart, FaSearch, FaMoon, FaSun, FaBars, FaTimes, FaSignOutAlt, FaCog, FaHistory, FaShieldAlt } from "react-icons/fa";

import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [darkMode, setDarkMode] = useState(localStorage.getItem("theme") === "dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
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
      if (!token || token === "undefined" || token === "null") return;
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(`${API_URL}/cart`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartCount(response.data.cart.length);
      } catch (error) {
        console.error("Error fetching cart count:", error);
        if (error.response?.status === 401) {
          handleLogout();
        }
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
    setIsProfileOpen(false);
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Explore", path: "/books" },
  ];

  if (user) {
    navLinks.push({ name: "Orders", path: "/my-orders" });
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-4 md:px-8 py-4 pointer-events-none">
      <div className="max-w-7xl mx-auto glass-premium rounded-[2rem] px-6 py-3 flex items-center justify-between gap-4 pointer-events-auto transition-all duration-500">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-transform duration-300">
            <FaBookOpen className="text-white text-xl" />
          </div>
          <h1 className="text-xl md:text-2xl font-extrabold tracking-tight dark:text-white">
            Book<span className="text-blue-600">Store</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold transition-all duration-300 hover:text-blue-600 ${
                location.pathname === link.path ? "text-blue-600" : "text-slate-600 dark:text-slate-300"
              }`}
            >
              {link.name}
            </Link>
          ))}
          {user?.role === "seller" && (
            <Link to="/seller-dashboard" className="px-4 py-1.5 bg-blue-600/10 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold border border-blue-600/20">
              Seller Hub
            </Link>
          )}
        </div>

        {/* Desktop Search & Actions */}
        <div className="hidden md:flex items-center gap-4 flex-grow max-w-sm">
          <form onSubmit={handleSearch} className="relative w-full">
            <input
              type="text"
              placeholder="Search library..."
              className="w-full bg-slate-100/50 dark:bg-slate-800/50 dark:text-white rounded-2xl py-2 pl-11 pr-4 outline-none focus:ring-2 focus:ring-blue-600/30 transition-all border border-transparent focus:bg-white dark:focus:bg-slate-800"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </form>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={() => setDarkMode(!darkMode)} 
            className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors text-slate-600 dark:text-slate-300"
          >
            {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
          </button>

          <Link to="/cart" className="relative p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors group">
            <FaShoppingCart className="text-xl text-slate-600 dark:text-slate-300 group-hover:text-blue-600 transition-colors" />
            {cartCount > 0 && (
              <span className="absolute top-2 right-2 bg-blue-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white dark:border-slate-900 shadow-lg">
                {cartCount}
              </span>
            )}
          </Link>

          {/* User Section */}
          <div className="hidden md:block relative">
            {user ? (
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center border-2 border-transparent hover:border-blue-600/30 transition-all overflow-hidden"
                >
                  <FaUserCircle className="text-2xl text-slate-400" />
                </button>

                {/* Profile Dropdown */}
                {isProfileOpen && (
                  <>
                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsProfileOpen(false)}></div>
                    <div className="absolute top-full right-0 mt-4 w-64 glass-premium rounded-3xl p-4 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
                      <div className="flex items-center gap-3 p-2 mb-4 border-b dark:border-white/5 pb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white font-bold text-xl">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold dark:text-white line-clamp-1">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Link to="/profile" className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors dark:text-slate-300" onClick={() => setIsProfileOpen(false)}>
                          <FaCog className="text-slate-400" /> Settings
                        </Link>
                        <Link to="/my-orders" className="flex items-center gap-3 p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors dark:text-slate-300" onClick={() => setIsProfileOpen(false)}>
                          <FaHistory className="text-slate-400" /> Order History
                        </Link>
                        {user.role === "admin" && (
                          <Link to="/admin" className="flex items-center gap-3 p-2 hover:bg-purple-100 dark:hover:bg-purple-900/20 text-purple-600 rounded-xl transition-colors" onClick={() => setIsProfileOpen(false)}>
                            <FaShieldAlt /> Admin Panel
                          </Link>
                        )}
                        <button onClick={handleLogout} className="flex items-center gap-3 p-2 w-full text-left text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors">
                          <FaSignOutAlt /> Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link to="/login" className="premium-btn px-6 py-2">
                Join
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition-colors text-slate-600 dark:text-slate-300"
          >
            {isMenuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-4 glass-premium rounded-[2rem] p-6 space-y-6 shadow-2xl animate-in slide-in-from-top-10 duration-500 pointer-events-auto">
           <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search books..."
              className="w-full bg-slate-100 dark:bg-slate-800/50 dark:text-white rounded-2xl py-3 pl-12 pr-4 outline-none border border-transparent focus:border-blue-600/30"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          </form>

          <div className="grid grid-cols-2 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl font-bold text-slate-700 dark:text-slate-200 hover:bg-blue-600 hover:text-white transition-all"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-6 border-t dark:border-white/5 space-y-3">
            {user ? (
              <>
                <Link to="/profile" className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl" onClick={() => setIsMenuOpen(false)}>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-bold dark:text-white">{user.name}</span>
                  </div>
                  <FaCog className="text-slate-400" />
                </Link>
                <button 
                  onClick={handleLogout}
                  className="w-full py-4 bg-red-50 dark:bg-red-900/20 text-red-600 font-bold rounded-2xl"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                onClick={() => setIsMenuOpen(false)}
                className="block w-full py-4 bg-blue-600 text-white text-center font-bold rounded-2xl shadow-lg shadow-blue-500/30"
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