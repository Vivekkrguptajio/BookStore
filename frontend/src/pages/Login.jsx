import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
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
      const response = await axios.post(`${API_URL}/users/login`, formData);
      
      console.log("Login Success:", response.data);
      
      // Store user and token in localStorage
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful!");

      // Role based redirection
      if (response.data.user.role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/"); // Default user home
      }

    } catch (error) {
      console.error("Login Error:", error.response?.data);
      alert(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md">
        
        <h1 className="text-4xl font-bold text-center text-blue-600 mb-3">
          Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome back to BookStore
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
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
              placeholder="Enter your password"
              className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-4 rounded-xl text-lg font-semibold transition`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 font-semibold ml-2 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;