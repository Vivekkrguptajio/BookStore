import { useState, useEffect } from "react";
import { FaBook, FaShoppingCart, FaRupeeSign, FaUsers, FaTrash, FaPlus, FaArrowLeft, FaSyncAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AddBook from "../components/AddBook";
import SellerBooks from "../components/SellerBooks";

function SellerDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
  });
  const [orders, setOrders] = useState([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const statsRes = await axios.get(`${API_URL}/stats/seller`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(statsRes.data.stats);

      const ordersRes = await axios.get(`${API_URL}/orders/seller`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(ordersRes.data.orders);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchData();
  }, [token, refreshTrigger]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${API_URL}/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      handleRefresh();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050810] pb-20 transition-colors duration-300">
      {/* Top Header */}
      <div className="glass-premium border-b dark:border-white/5 px-8 py-5 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/")} className="p-3 bg-slate-100 dark:bg-slate-800 rounded-2xl hover:text-blue-600 transition-colors">
            <FaArrowLeft />
          </button>
          <div className="flex items-center gap-3 border-l dark:border-white/5 pl-4">
            <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
              <FaBook className="text-white text-xl" />
            </div>
            <h1 className="text-2xl font-black tracking-tight dark:text-white">Seller <span className="text-blue-600">Hub</span></h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end">
             <span className="text-xs font-black uppercase tracking-widest text-slate-400">Store Manager</span>
             <span className="font-bold dark:text-white">{JSON.parse(localStorage.getItem("user"))?.name}</span>
          </div>
          <button onClick={handleLogout} className="p-3 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-2xl transition-colors">
            Logout
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 md:p-12">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <SellerStatCard title="Total Books" value={stats.totalBooks} icon={<FaBook />} color="bg-blue-500" />
          <SellerStatCard title="Orders" value={stats.totalOrders} icon={<FaShoppingCart />} color="bg-emerald-500" />
          <SellerStatCard title="Revenue" value={`₹${stats.totalRevenue}`} icon={<FaRupeeSign />} color="bg-orange-500" />
          <SellerStatCard title="Customers" value={stats.totalCustomers} icon={<FaUsers />} color="bg-purple-500" />
        </div>

        <div className="grid lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-1">
             <div className="sticky top-32">
                <AddBook onBookAdded={handleRefresh} />
             </div>
          </div>
          <div className="lg:col-span-2">
            <div className="card-premium h-full">
               <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Your Inventory</h2>
                  <button onClick={handleRefresh} className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                    <FaSyncAlt className={refreshTrigger ? "animate-spin" : ""} />
                  </button>
               </div>
               <SellerBooks refreshTrigger={refreshTrigger} />
            </div>
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="card-premium">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center">
                  <FaShoppingCart size={24} />
               </div>
               <div>
                 <h2 className="text-2xl font-black text-slate-800 dark:text-white tracking-tight">Recent Sales</h2>
                 <p className="text-sm text-slate-500 font-medium">Monitor your store's latest transactions</p>
               </div>
            </div>
            <button
              onClick={handleRefresh}
              className="premium-btn-outline px-6 py-2 text-sm"
            >
              Refresh Orders
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-slate-100 dark:border-white/5">
                  <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Order Ref</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Earnings</th>
                  <th className="pb-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                  <th className="pb-6 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50 dark:divide-white/5">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-20 text-center text-slate-400 font-bold uppercase tracking-widest text-xs">
                      No sales yet
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="group hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                      <td className="py-6 font-mono text-xs text-slate-400">
                        #{order._id.substring(16, 24).toUpperCase()}
                      </td>
                      <td className="py-6">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center text-xs font-bold text-slate-500">
                              {order.user?.name.charAt(0)}
                           </div>
                           <div>
                              <p className="font-bold text-slate-800 dark:text-white text-sm">{order.user?.name}</p>
                              <p className="text-[10px] text-slate-500 font-medium">{order.user?.email}</p>
                           </div>
                        </div>
                      </td>
                      <td className="py-6">
                        <span className="text-lg font-black dark:text-white">₹{order.totalPrice}</span>
                      </td>
                      <td className="py-6">
                        <span
                          className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                            order.orderStatus === "delivered"
                              ? "bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600"
                              : order.orderStatus === "processing"
                              ? "bg-blue-50 dark:bg-blue-500/10 text-blue-600"
                              : "bg-orange-50 dark:bg-orange-500/10 text-orange-600"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="py-6 text-right">
                        <button 
                          onClick={() => handleDeleteOrder(order._id)}
                          className="w-10 h-10 flex items-center justify-center text-rose-500 opacity-0 group-hover:opacity-100 hover:bg-rose-50 dark:hover:bg-rose-500/20 rounded-2xl transition-all"
                        >
                          <FaTrash size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function SellerStatCard({ title, value, icon, color }) {
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

export default SellerDashboard;

