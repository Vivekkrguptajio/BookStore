import { useState, useEffect } from "react";
import { FaUsers, FaUserTie, FaBook, FaRupeeSign, FaTrash, FaShieldAlt, FaShoppingCart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalSellers: 0,
    totalRevenue: 0,
  });
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const statsRes = await axios.get(`${API_URL}/stats/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(statsRes.data.stats);

      const usersRes = await axios.get(`${API_URL}/users/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(usersRes.data.users);

      const booksRes = await axios.get(`${API_URL}/books`);
      setBooks(booksRes.data.books);
    } catch (error) {
      console.error("Error fetching admin data:", error);
      if (error.response?.status === 403) {
        alert("Access Denied: Admin only");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [token, refreshTrigger]);

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure? This will also remove all books by this seller.")) return;
    try {
      await axios.delete(`${API_URL}/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      alert("Failed to delete user");
    }
  };

  const handleDeleteBook = async (id) => {
    if (!window.confirm("Are you sure you want to remove this book?")) return;
    try {
      await axios.delete(`${API_URL}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Book removed successfully");
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      alert("Failed to delete book");
    }
  };

  const sellers = users.filter(u => u.role === "seller");
  const regularUsers = users.filter(u => u.role === "user");

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white">Loading Admin Panel...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pb-20 transition-colors duration-300">
      {/* Top Navbar */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border-b dark:border-gray-800 px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-purple-200 dark:shadow-none">
            <FaShieldAlt className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Admin Control Center</h1>
        </div>

        <div className="flex items-center gap-6">
          <button onClick={() => navigate("/")} className="text-gray-600 dark:text-gray-400 font-semibold hover:text-purple-600 transition">View Site</button>
          <div className="h-6 w-px bg-gray-200 dark:bg-gray-800"></div>
          <span className="text-gray-600 dark:text-gray-400 font-medium">
             Admin: <span className="text-purple-600 font-bold">{JSON.parse(localStorage.getItem("user"))?.name}</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <StatCard title="Total Users" value={stats.totalUsers} icon={<FaUsers />} color="blue" />
          <StatCard title="Total Sellers" value={stats.totalSellers} icon={<FaUserTie />} color="purple" />
          <StatCard title="Total Books" value={stats.totalBooks} icon={<FaBook />} color="green" />
          <StatCard title="Total Orders" value={stats.totalOrders} icon={<FaShoppingCart />} color="orange" />
          <StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} icon={<FaRupeeSign />} color="yellow" />
        </div>

        <div className="space-y-10">
          {/* Books Management Table */}
          <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
            <div className="flex items-center gap-3 mb-8">
              <FaBook className="text-green-600 text-2xl" />
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">All Listed Books</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-100 dark:border-gray-800">
                    <th className="pb-4 font-semibold text-gray-600 dark:text-gray-400">Book</th>
                    <th className="pb-4 font-semibold text-gray-600 dark:text-gray-400">Seller</th>
                    <th className="pb-4 font-semibold text-gray-600 dark:text-gray-400">Price</th>
                    <th className="pb-4 font-semibold text-gray-600 dark:text-gray-400">Category</th>
                    <th className="pb-4 font-semibold text-gray-600 dark:text-gray-400 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                  {books.map((book) => (
                    <tr key={book._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <td className="py-4">
                        <div className="flex items-center gap-3">
                          <img src={book.image} alt="" className="w-10 h-14 object-cover rounded-md" />
                          <div>
                            <p className="font-bold text-gray-800 dark:text-white line-clamp-1">{book.title}</p>
                            <p className="text-xs text-gray-400">{book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 text-gray-600 dark:text-gray-400 text-sm">{book.seller?.name || "Unknown"}</td>
                      <td className="py-4 font-bold text-blue-600 dark:text-blue-400">₹{book.price}</td>
                      <td className="py-4"><span className="bg-gray-100 dark:bg-gray-800 px-3 py-1 rounded-full text-xs text-gray-600 dark:text-gray-400">{book.category}</span></td>
                      <td className="py-4 text-right">
                        <button onClick={() => handleDeleteBook(book._id)} className="p-3 text-red-400 hover:text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl transition"><FaTrash size={16} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <UserTable title="Sellers List" users={sellers} onDelete={handleDeleteUser} icon={<FaUserTie className="text-purple-600" />} />
            <UserTable title="Customers List" users={regularUsers} onDelete={handleDeleteUser} icon={<FaUsers className="text-blue-600" />} />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  const colors = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-600",
    yellow: "bg-yellow-50 text-yellow-600",
  };
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${colors[color]} dark:bg-opacity-10`}>{icon}</div>
        <div>
          <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</p>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{value}</h2>
        </div>
      </div>
    </div>
  );
}

function UserTable({ title, users, onDelete, icon }) {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
      <div className="flex items-center gap-3 mb-8">{icon}<h2 className="text-2xl font-bold text-gray-800 dark:text-white">{title}</h2></div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-gray-100 dark:border-gray-800">
              <th className="pb-4 font-semibold text-gray-600 dark:text-gray-400">Name</th>
              <th className="pb-4 font-semibold text-gray-600 dark:text-gray-400">Email</th>
              <th className="pb-4 font-semibold text-gray-600 dark:text-gray-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
            {users.map((user) => (
              <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <td className="py-4 font-semibold text-gray-800 dark:text-white">{user.name}</td>
                <td className="py-4 text-gray-500 dark:text-gray-400">{user.email}</td>
                <td className="py-4 text-right">
                  <button onClick={() => onDelete(user._id)} className="p-3 text-red-400 hover:text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl transition"><FaTrash size={16} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard;
