import { Link } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import Navbar from "../components/Navbar";

function Cancel() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-8">
        <div className="bg-white p-16 rounded-3xl shadow-xl text-center max-w-lg w-full">
          <div className="w-24 h-24 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <FaTimesCircle className="text-6xl" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Payment Cancelled</h1>
          <p className="text-gray-500 mb-10 text-lg">
            Your payment was not completed. Don't worry, your items are still safe in your cart.
          </p>
          <div className="flex flex-col gap-4">
            <Link to="/cart" className="bg-blue-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-100">
              Return to Cart
            </Link>
            <Link to="/" className="text-gray-500 font-semibold hover:underline">
              Go to Home
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Cancel;
