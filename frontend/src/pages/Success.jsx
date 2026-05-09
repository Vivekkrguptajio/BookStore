import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";

function Success() {
  useEffect(() => {
    // Optionally trigger the cart-updated event to clear the local badge
    window.dispatchEvent(new Event("cart-updated"));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white p-16 rounded-3xl shadow-xl text-center max-w-lg w-full">
          <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaCheckCircle className="text-6xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
          <p className="text-gray-500 mb-10 text-lg">
            Thank you for your purchase. Your order has been placed successfully and is being processed.
          </p>
          <div className="flex flex-col gap-4">
            <Link to="/" className="bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Go to Home
            </Link>
            <Link to="/books" className="text-blue-600 font-semibold hover:underline">
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Success;
