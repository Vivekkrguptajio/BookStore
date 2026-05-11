import { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaMinus, FaPlus, FaShoppingCart, FaArrowRight } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchCart = async () => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const response = await axios.get(`${API_URL}/cart`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(response.data.cart);
    } catch (error) {
      console.error("Error fetching cart:", error);
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const handleUpdateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(`${API_URL}/cart/${id}`, { quantity }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`${API_URL}/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchCart();
      window.dispatchEvent(new Event("cart-updated"));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const response = await axios.post(`${API_URL}/payment/checkout`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        alert("Order created successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      alert(error.response?.data?.message || "Checkout failed. Please try again.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.book.price * item.quantity, 0);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center dark:bg-gray-950 dark:text-white transition-colors duration-300">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow max-w-7xl mx-auto px-8 py-16 w-full">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-10 flex items-center gap-4">
          <FaShoppingCart className="text-blue-600 dark:text-blue-400" /> My Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-16 text-center shadow-sm border border-gray-100 dark:border-gray-800 transition-colors duration-300">
            <div className="w-24 h-24 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaShoppingCart className="text-4xl" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">Your cart is empty</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-8 text-lg">Looks like you haven't added any books to your cart yet.</p>
            <Link to="/books" className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition inline-block">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map((item) => (
                <div key={item._id} className="bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-gray-700 flex items-center gap-6 hover:shadow-md transition">
                  <img 
                    src={item.book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"} 
                    alt={item.book.title} 
                    className="w-32 h-44 object-cover rounded-2xl"
                  />
                  
                  <div className="flex-grow">
                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-1 line-clamp-1">{item.book.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400 mb-4">{item.book.author}</p>
                    <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">₹{item.book.price}</p>
                  </div>

                  <div className="flex flex-col items-end gap-6">
                    <button 
                      onClick={() => handleRemoveItem(item._id)}
                      className="text-red-400 hover:text-red-600 transition p-2 bg-red-50 dark:bg-red-900/20 rounded-xl"
                    >
                      <FaTrash size={20} />
                    </button>

                    <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 p-2 rounded-2xl">
                      <button 
                        onClick={() => handleUpdateQuantity(item._id, item.quantity - 1)}
                        className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition shadow-sm"
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="font-bold text-xl w-8 text-center dark:text-white">{item.quantity}</span>
                      <button 
                        onClick={() => handleUpdateQuantity(item._id, item.quantity + 1)}
                        className="w-10 h-10 bg-white dark:bg-gray-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-blue-600 hover:text-white transition shadow-sm"
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-sm border border-gray-100 dark:border-gray-800 sticky top-32 transition-colors duration-300">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-8 pb-4 border-b dark:border-gray-800">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Subtotal</span>
                    <span className="font-semibold text-gray-800 dark:text-white">₹{calculateTotal()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Shipping</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between text-2xl font-bold text-gray-800 dark:text-white pt-4 border-t dark:border-gray-800">
                    <span>Total</span>
                    <span className="text-blue-600 dark:text-blue-400">₹{calculateTotal()}</span>
                  </div>
                </div>

                <button 
                  onClick={handleCheckout}
                  disabled={checkoutLoading}
                  className={`w-full ${checkoutLoading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-5 rounded-2xl font-bold text-lg transition flex items-center justify-center gap-3 group shadow-lg shadow-blue-100 dark:shadow-none`}
                >
                  {checkoutLoading ? "Processing..." : "Proceed to Checkout"} <FaArrowRight className="group-hover:translate-x-2 transition" />
                </button>
                
                <p className="text-center text-gray-400 dark:text-gray-500 mt-6 text-sm flex items-center justify-center gap-2">
                   Secure payment powered by Stripe
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
