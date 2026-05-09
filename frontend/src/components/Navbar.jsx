import { FaBookOpen, FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-sm border-b px-8 py-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <FaBookOpen className="text-3xl text-blue-600" />
          <h1 className="text-2xl font-bold text-gray-800">BookStore</h1>
        </Link>

        {/* Menu */}
        <ul className="hidden md:flex items-center gap-8 text-lg font-medium">
          <li>
            <Link to="/" className="hover:text-blue-600 transition">Home</Link>
          </li>
          <li>
            <Link to="/books" className="hover:text-blue-600 transition">Books</Link>
          </li>
          {user?.role === "seller" && (
            <li>
              <Link to="/seller-dashboard" className="text-blue-600 font-semibold">Dashboard</Link>
            </li>
          )}
        </ul>

        {/* Buttons */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-gray-700 font-medium">
                <FaUserCircle className="text-2xl" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleLogout}
                className="px-5 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition border border-red-100"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="px-5 py-2 text-blue-600 font-semibold hover:text-blue-700 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-md shadow-blue-100 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;