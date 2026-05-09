import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaSpinner } from "react-icons/fa";
import Navbar from "../components/Navbar";
import axios from "axios";

function Success() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const finalizeOrder = async () => {
      const token = localStorage.getItem("token");
      const API_URL = import.meta.env.VITE_API_URL;

      try {
        // Backend order create endpoint call karein
        // Ye cart se items lega aur Order model me save kareगा
        await axios.post(`${API_URL}/orders`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        // Cart badge update karne ke liye event dispatch karein
        window.dispatchEvent(new Event("cart-updated"));
      } catch (err) {
        console.error("Error finalizing order:", err);
        setError("Order processing failed, but your payment was successful. Please contact support.");
      } finally {
        setLoading(false);
      }
    };

    finalizeOrder();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white dark:bg-gray-900 p-16 rounded-3xl shadow-xl text-center max-w-lg w-full border dark:border-gray-800">
          {loading ? (
            <div className="flex flex-col items-center gap-4">
              <FaSpinner className="text-6xl text-blue-600 animate-spin" />
              <h2 className="text-2xl font-bold dark:text-white">Finalizing your order...</h2>
            </div>
          ) : error ? (
            <div className="text-red-500">
              <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
              <p>{error}</p>
              <Link to="/" className="mt-8 inline-block bg-blue-600 text-white px-8 py-3 rounded-xl">Go Home</Link>
            </div>
          ) : (
            <>
              <div className="w-24 h-24 bg-green-50 dark:bg-green-900/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
                <FaCheckCircle className="text-6xl" />
              </div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">Payment Successful!</h1>
              <p className="text-gray-500 dark:text-gray-400 mb-10 text-lg">
                Thank you for your purchase. Your order has been placed successfully and is now visible to the seller.
              </p>
              <div className="flex flex-col gap-4">
                <Link to="/my-orders" className="bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100 dark:shadow-none">
                  View My Orders
                </Link>
                <Link to="/books" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  Continue Shopping
                </Link>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

export default Success;
