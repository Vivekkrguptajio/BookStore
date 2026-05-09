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
      
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      alert("Login Successful!");

      // Role based redirection
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else if (response.data.user.role === "seller") {
        navigate("/seller-dashboard");
      } else {
        navigate("/"); 
      }

    } catch (error) {
      console.error("Login Error:", error.response?.data);
      alert(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-6 py-10 transition-colors duration-300">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl p-10 w-full max-w-md border dark:border-gray-800">
        
        <h1 className="text-4xl font-bold text-center text-blue-600 dark:text-blue-400 mb-3">
          Login
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-400 mb-8">
          Welcome back to BookStore
        </p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-2 font-semibold dark:text-gray-200">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white rounded-xl px-5 py-3 outline-none focus:border-blue-600 dark:focus:border-blue-400 transition"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold dark:text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-gray-300 dark:border-gray-700 bg-transparent dark:text-white rounded-xl px-5 py-3 outline-none focus:border-blue-600 dark:focus:border-blue-400 transition"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'} text-white py-4 rounded-xl text-lg font-semibold transition shadow-lg shadow-blue-100 dark:shadow-none`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center mt-6 text-gray-600 dark:text-gray-400">
          Don't have an account?
          <Link to="/signup" className="text-blue-600 dark:text-blue-400 font-semibold ml-2 hover:underline">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;