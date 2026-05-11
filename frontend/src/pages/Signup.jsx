import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaArrowRight } from "react-icons/fa";

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
      await axios.post(`${API_URL}/users/register`, {
        ...formData,
        role: "user", // Default role
      });
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error.response?.data);
      alert(error.response?.data?.message || "Signup failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050810] flex items-center justify-center px-6 py-10 transition-colors duration-300 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full -z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="card-premium w-full max-w-md relative z-10 p-8 md:p-12 animate-in fade-in zoom-in duration-500">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">
            Join the <span className="premium-gradient-text">Community</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium">
            Start your reading adventure today
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
            <div className="relative group">
              <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="input-premium pl-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
            <div className="relative group">
              <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="name@example.com"
                className="input-premium pl-12"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-1">Password</label>
            <div className="relative group">
              <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Min. 8 characters"
                className="input-premium pl-12"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="premium-btn w-full shadow-xl shadow-blue-500/20 py-4 mt-4"
          >
            {loading ? "Creating Account..." : "Create Account"}
            {!loading && <FaArrowRight className="text-sm" />}
          </button>
        </form>

        <div className="mt-10 pt-8 border-t dark:border-white/5 text-center">
          <p className="text-slate-600 dark:text-slate-400 font-medium">
            Already have an account?
            <Link to="/login" className="text-blue-600 dark:text-blue-400 font-bold ml-2 hover:underline">
              Sign In
            </Link>
          </p>
        </div>

        <div className="mt-6 flex flex-col items-center gap-2">
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Want to sell books?</p>
          <Link to="/seller-register" className="text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 transition-colors">
            Become a Seller
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;

