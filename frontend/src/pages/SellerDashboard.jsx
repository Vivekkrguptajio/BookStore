import { useState, useEffect } from "react";
import { FaBook, FaShoppingCart, FaRupeeSign, FaUsers } from "react-icons/fa";
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

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      {/* Top Navbar */}
      <div className="bg-white shadow-sm border-b px-8 py-5 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <FaBook className="text-white text-xl" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Seller Panel</h1>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-gray-600 font-medium">
            Welcome, {JSON.parse(localStorage.getItem("user"))?.name}
          </span>
          <button
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-6 py-2 rounded-xl font-semibold hover:bg-red-600 hover:text-white transition-all border border-red-100"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto p-8">
        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Total Books */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Total Books</p>
                <h2 className="text-4xl font-bold mt-2 text-gray-800">{stats.totalBooks}</h2>
              </div>
              <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center">
                <FaBook className="text-3xl text-blue-600" />
              </div>
            </div>
          </div>

          {/* Orders */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Orders</p>
                <h2 className="text-4xl font-bold mt-2 text-gray-800">{stats.totalOrders}</h2>
              </div>
              <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center">
                <FaShoppingCart className="text-3xl text-green-600" />
              </div>
            </div>
          </div>

          {/* Revenue */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Revenue</p>
                <h2 className="text-4xl font-bold mt-2 text-gray-800">₹{stats.totalRevenue}</h2>
              </div>
              <div className="w-14 h-14 bg-yellow-50 rounded-2xl flex items-center justify-center">
                <FaRupeeSign className="text-3xl text-yellow-500" />
              </div>
            </div>
          </div>

          {/* Customers */}
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 font-medium">Customers</p>
                <h2 className="text-4xl font-bold mt-2 text-gray-800">{stats.totalCustomers}</h2>
              </div>
              <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center">
                <FaUsers className="text-3xl text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1">
            <AddBook onBookAdded={handleRefresh} />
          </div>
          <div className="lg:col-span-2">
            <SellerBooks refreshTrigger={refreshTrigger} />
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 mt-10 p-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-800">Recent Orders</h2>
            <button
              onClick={handleRefresh}
              className="text-blue-600 font-semibold hover:underline"
            >
              Refresh
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left border-b border-gray-100">
                  <th className="pb-4 font-semibold text-gray-600">Order ID</th>
                  <th className="pb-4 font-semibold text-gray-600">Customer</th>
                  <th className="pb-4 font-semibold text-gray-600">Book</th>
                  <th className="pb-4 font-semibold text-gray-600">Price</th>
                  <th className="pb-4 font-semibold text-gray-600">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="py-10 text-center text-gray-500">
                      No orders yet.
                    </td>
                  </tr>
                ) : (
                  orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="py-4 font-mono text-sm text-gray-500">
                        #{order._id.substring(0, 8)}
                      </td>
                      <td className="py-4">
                        <div className="font-semibold text-gray-800">{order.user?.name}</div>
                        <div className="text-xs text-gray-400">{order.user?.email}</div>
                      </td>
                      <td className="py-4 text-gray-700">
                        {order.orderItems.map((item) => item.book?.title).join(", ")}
                      </td>
                      <td className="py-4 font-bold text-blue-600">₹{order.totalPrice}</td>
                      <td className="py-4">
                        <span
                          className={`px-4 py-1 rounded-full text-xs font-bold uppercase ${
                            order.orderStatus === "delivered"
                              ? "bg-green-100 text-green-700"
                              : order.orderStatus === "processing"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.orderStatus}
                        </span>
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

export default SellerDashboard;
