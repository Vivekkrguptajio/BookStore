import { useState, useEffect } from "react";
import axios from "axios";
import { FaBox, FaClock, FaCheckCircle, FaExclamationCircle, FaTrash } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchOrders = async () => {
    try {
      const response = await axios.get(`${API_URL}/orders/my-orders`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching my orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetchOrders();
  }, [token, API_URL]);

  const handleDeleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${API_URL}/orders/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Order deleted successfully");
      fetchOrders();
    } catch (error) {
      console.error("Error deleting order:", error);
      alert("Failed to delete order");
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "processing": return <FaClock className="text-blue-500" />;
      case "delivered": return <FaCheckCircle className="text-green-500" />;
      case "shipped": return <FaBox className="text-yellow-500" />;
      default: return <FaExclamationCircle className="text-gray-500" />;
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white">Loading your orders...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow max-w-5xl mx-auto px-8 py-16 w-full">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-10 flex items-center gap-4">
          <FaBox className="text-blue-600 dark:text-blue-400" /> My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-16 text-center shadow-sm border border-gray-100 dark:border-gray-800">
             <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaBox className="text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">No orders found</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">You haven't placed any orders yet.</p>
            <button onClick={() => navigate("/books")} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition">
              Browse Books
            </button>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="bg-white dark:bg-gray-900 rounded-3xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 hover:shadow-md transition">
                {/* Order Header */}
                <div className="bg-gray-50 dark:bg-gray-800/50 px-8 py-6 flex flex-wrap justify-between items-center gap-4 border-b dark:border-gray-800">
                  <div className="flex gap-8">
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold mb-1">Order Date</p>
                      <p className="font-semibold text-gray-700 dark:text-gray-200">{new Date(order.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 uppercase font-bold mb-1">Total Amount</p>
                      <p className="font-bold text-blue-600 dark:text-blue-400">₹{order.totalPrice}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="text-xs text-gray-400 uppercase font-bold mb-1">Order ID</p>
                      <p className="font-mono text-sm text-gray-500 dark:text-gray-400">#{order._id.substring(0, 12)}</p>
                    </div>
                    <button 
                      onClick={() => handleDeleteOrder(order._id)}
                      className="p-3 text-red-400 hover:text-red-600 bg-red-50 dark:bg-red-900/20 rounded-xl transition"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    {getStatusIcon(order.orderStatus)}
                    <span className={`font-bold uppercase text-sm px-3 py-1 rounded-lg ${
                      order.orderStatus === "delivered" ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
                    }`}>
                      {order.orderStatus}
                    </span>
                  </div>

                  <div className="space-y-6">
                    {order.orderItems.map((item, index) => (
                      <div key={index} className="flex items-center gap-6">
                        <img 
                          src={item.book?.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"} 
                          alt={item.book?.title} 
                          className="w-20 h-28 object-cover rounded-xl"
                        />
                        <div className="flex-grow">
                          <h4 className="text-xl font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">{item.book?.title}</h4>
                          <p className="text-gray-500 dark:text-gray-400">{item.book?.author}</p>
                          <div className="flex justify-between items-center mt-2">
                             <p className="text-gray-600 dark:text-gray-300">Quantity: <span className="font-bold">{item.quantity}</span></p>
                             <p className="font-bold text-gray-800 dark:text-white">₹{item.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default MyOrders;
