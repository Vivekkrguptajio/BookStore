import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();
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
      const response = await axios.post(`${API_URL}/users/register`, {
        ...formData,
        role: "user", // Default role
      });

      console.log("Signup Success:", response.data);
      alert("Account Created Successfully!");
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      alert(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-3">Sign Up</h1>
        <p className="text-center text-gray-500 mb-8">Join the BookStore community</p>

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
              placeholder="Create a password"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-4 rounded-xl text-lg font-semibold transition`}
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Already have an account?
          <Link to="/login" className="text-blue-600 font-semibold ml-2 hover:underline">
            Login
          </Link>
        </p>

        <div className="mt-8 pt-6 border-t border-gray-100 text-center">
            <p className="text-gray-500">Want to sell books?</p>
            <Link to="/seller-register" className="text-blue-600 font-semibold hover:underline">
                Become a Seller
            </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
