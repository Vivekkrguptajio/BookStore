import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate add kiya redirect ke liye
import axios from "axios";

function SellerRegister() {
  const navigate = useNavigate();
  
  // 1. State se shopName aur phone hata diya
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  const API_URL = import.meta.env.VITE_API_URL;

  try {
    // '/auth/register' ko badal kar '/users/register' karein
    const response = await axios.post(`${API_URL}/users/register`, {
      ...formData,
      role: "seller", 
    });

    console.log("Success:", response.data);
    alert("Seller Registered Successfully!");
    navigate("/login");
  } catch (error) {
    // Exact error dekhne ke liye ye console log rakhein
    console.error("Error Response:", error.response?.data);
    alert(error.response?.data?.message || "Registration failed!");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-2xl">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-3">Become A Seller</h1>
        <p className="text-center text-gray-500 mb-8">Start selling your books online easily</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-semibold">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create password"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-4 rounded-xl text-lg font-semibold transition`}
          >
            {loading ? "Registering..." : "Register As Seller"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 font-semibold ml-2 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default SellerRegister;
