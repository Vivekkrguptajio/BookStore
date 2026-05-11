import { useState, useEffect } from "react";
import { FaUsers, FaUserTie, FaBook, FaRupeeSign, FaTrash, FaShieldAlt, FaShoppingCart, FaArrowLeft, FaExternalLinkAlt } from "react-icons/fa";
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
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      alert("Failed to delete book");
    }
  };

  const sellers = users.filter(u => u.role === "seller");
  const regularUsers = users.filter(u => u.role === "user");

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#050810]">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="font-bold text-slate-500 animate-pulse uppercase tracking-widest text-xs">Accessing Control Center...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050810] pb-20 transition-colors duration-300">
      {/* Top Header */}
      <div className="glass-premium border-b dark:border-white/5 px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:text-blue-600 transition-colors">
            <FaArrowLeft />
          </button>
          <div className="flex items-center gap-3 border-l dark:border-white/5 pl-4">
            <div className="w-10 h-10 bg-gradient-to-tr from-purple-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/20">
              <FaShieldAlt className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-black tracking-tight dark:text-white">Admin <span className="text-purple-600">Hub</span></h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-xs font-black uppercase tracking-widest text-slate-400">Authenticated Admin</span>
             <span className="font-bold dark:text-white">{JSON.parse(localStorage.getItem("user"))?.name}</span>
          </div>
          <div className="w-10 h-10 bg-slate-100 dark:bg-slate-800 rounded-2xl flex items-center justify-center font-bold text-blue-600">
             {JSON.parse(localStorage.getItem("user"))?.name.charAt(0)}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          <StatCard title="Users" value={stats.totalUsers} icon={<FaUsers />} color="bg-blue-500" />
          <StatCard title="Sellers" value={stats.totalSellers} icon={<FaUserTie />} color="bg-purple-500" />
          <StatCard title="Inventory" value={stats.totalBooks} icon={<FaBook />} color="bg-emerald-500" />
          <StatCard title="Orders" value={stats.totalOrders} icon={<FaShoppingCart />} color="bg-orange-500" />
          <StatCard title="Revenue" value={`₹${stats.totalRevenue}`} icon={<FaRupeeSign />} color="bg-rose-500" />
        </div>

        <div className="space-y-12">
          {/* Books Section */}
          <div className="card-premium">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
                   <FaBook size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Global Inventory</h2>
                  <p className="text-sm text-slate-500 font-medium">Manage all books listed across the platform</p>
                </div>
              </div>
              <button className="premium-btn-outline px-6 py-2 text-sm">
                Export Data
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-slate-100 dark:border-white/5">
                    <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Book Details</th>
                    <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Seller Info</th>
                    <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Price</th>
                    <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                    <th className="pb-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                  {books.map((book) => (
                    <tr key={book._id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-6">
                        <div className="flex items-center gap-4">
                          <img src={book.image} alt="" className="w-12 h-16 object-cover rounded-xl shadow-lg" />
                          <div>
                            <p className="font-bold text-slate-800 dark:text-white">{book.title}</p>
                            <p className="text-xs text-slate-500 font-medium">{book.author}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <div className="flex flex-col">
                           <span className="font-bold dark:text-slate-300 text-sm">{book.seller?.name || "Anonymous"}</span>
                           <span className="text-[10px] text-slate-500 uppercase font-black tracking-tighter">Verified Seller</span>
                        </div>
                      </td>
                      <td className="py-6">
                        <span className="text-lg font-black dark:text-white">₹{book.price}</span>
                      </td>
                      <td className="py-6">
                        <span className="px-3 py-1 bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-full text-[10px] font-black uppercase tracking-widest">
                          {book.category}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        <button onClick={() => handleDeleteBook(book._id)} className="w-10 h-10 flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-2xl transition-all">
                          <FaTrash />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Tables Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            <ModernUserTable title="Active Sellers" users={sellers} onDelete={handleDeleteUser} accentColor="purple" />
            <ModernUserTable title="Registered Users" users={regularUsers} onDelete={handleDeleteUser} accentColor="blue" />
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <div className="card-premium p-6 group hover:scale-[1.02] transition-all">
      <div className="flex flex-col gap-6">
        <div className={`w-14 h-14 rounded-3xl ${color} text-white flex items-center justify-center text-2xl shadow-xl transition-transform group-hover:rotate-12`}>
          {icon}
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">{value}</h2>
        </div>
      </div>
    </div>
  );
}

function ModernUserTable({ title, users, onDelete, accentColor }) {
  const accents = {
    purple: "text-purple-600 bg-purple-500/10",
    blue: "text-blue-600 bg-blue-500/10",
  };
  
  return (
    <div className="card-premium">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-xl font-black text-slate-800 dark:text-white tracking-tight">{title}</h2>
        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${accents[accentColor]}`}>
          {users.length} Total
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left border-b border-slate-100 dark:border-white/5">
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Identity</th>
              <th className="pb-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50 dark:divide-white/5">
            {users.map((user) => (
              <tr key={user._id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-slate-100 dark:bg-slate-800 rounded-xl flex items-center justify-center font-bold text-slate-600 dark:text-slate-400">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold dark:text-white">{user.name}</p>
                      <p className="text-[10px] text-slate-500 font-medium">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="py-4 text-right">
                  <button onClick={() => onDelete(user._id)} className="text-rose-500 opacity-0 group-hover:opacity-100 p-2 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-xl transition-all">
                    <FaTrash size={14} />
                  </button>
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

