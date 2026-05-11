import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaTrash, FaEdit, FaCheck, FaTimes, FaShieldAlt, FaCalendarAlt, FaCamera } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
  });
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.put(`${API_URL}/users/profile`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(response.data.user);
      setIsEditing(false);
    } catch (error) {
      console.error("Update error:", error);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    const confirmText = user.role === "seller" 
      ? "WARNING: As a seller, deleting your account will also REMOVE ALL YOUR LISTED BOOKS. Are you sure you want to proceed?"
      : "Are you sure you want to delete your account? This action cannot be undone.";
      
    if (!window.confirm(confirmText)) return;
    
    try {
      await axios.delete(`${API_URL}/users/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete account");
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050810] flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-grow max-w-5xl mx-auto px-6 py-24 w-full">
        <div className="card-premium overflow-hidden p-0 border-none shadow-2xl">
          {/* Cover Header */}
          <div className="h-48 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 relative">
             <div className="absolute inset-0 bg-black/10"></div>
          </div>
          
          <div className="px-8 md:px-12 pb-12">
            <div className="relative -mt-20 mb-10 flex items-end justify-between flex-wrap gap-6">
              <div className="relative group">
                <div className="w-40 h-40 bg-white dark:bg-slate-900 rounded-[2.5rem] p-3 shadow-2xl relative z-10">
                  <div className="w-full h-full bg-slate-100 dark:bg-slate-800 rounded-[2rem] flex items-center justify-center text-blue-600 dark:text-blue-400 overflow-hidden">
                    <span className="text-6xl font-black">{user.name.charAt(0)}</span>
                  </div>
                </div>
                <button className="absolute bottom-2 right-2 z-20 w-10 h-10 bg-blue-600 text-white rounded-2xl flex items-center justify-center shadow-xl border-4 border-white dark:border-slate-900 group-hover:scale-110 transition-transform">
                   <FaCamera size={14} />
                </button>
              </div>
              
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="premium-btn px-8 shadow-xl shadow-blue-500/20"
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>

            <div className="flex flex-col lg:flex-row gap-16">
              {/* Info Section */}
              <div className="flex-grow">
                {isEditing ? (
                  <form onSubmit={handleUpdate} className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <div className="grid md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className="input-premium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className="input-premium"
                        />
                      </div>
                    </div>
                    
                    <div className="flex gap-4 pt-4 border-t dark:border-white/5">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="premium-btn px-10"
                      >
                        <FaCheck /> {loading ? "Updating..." : "Save Changes"}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(false)}
                        className="premium-btn-outline px-10"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-12 animate-in fade-in duration-700">
                    <div>
                      <h1 className="text-5xl font-black text-slate-900 dark:text-white mb-3 tracking-tight">{user.name}</h1>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-black uppercase tracking-widest text-xs px-3 py-1.5 bg-blue-50 dark:bg-blue-500/10 w-fit rounded-full">
                        <FaShieldAlt /> {user.role} Account
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 group hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-xl">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Contact Info</p>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-blue-500/10 text-blue-600 rounded-2xl flex items-center justify-center">
                              <FaEnvelope />
                           </div>
                           <p className="text-lg font-bold text-slate-800 dark:text-slate-200">{user.email}</p>
                        </div>
                      </div>
                      
                      <div className="bg-slate-50 dark:bg-slate-800/40 p-8 rounded-[2rem] border border-slate-100 dark:border-white/5 group hover:bg-white dark:hover:bg-slate-800 transition-all duration-300 shadow-sm hover:shadow-xl">
                        <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Membership</p>
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-emerald-500/10 text-emerald-600 rounded-2xl flex items-center justify-center">
                              <FaCalendarAlt />
                           </div>
                           <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Active Member</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Sidebar / Danger Zone */}
              <div className="lg:w-80">
                <div className="bg-rose-50 dark:bg-rose-500/5 p-8 rounded-[2rem] border border-rose-100 dark:border-rose-500/10">
                  <h3 className="text-rose-600 dark:text-rose-400 font-black mb-4 flex items-center gap-2 uppercase tracking-widest text-xs">
                    <FaTrash /> Privacy & Security
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mb-8 leading-relaxed font-medium">
                    Deleting your account is permanent. All your data, orders, and listings will be removed forever.
                  </p>
                  <button 
                    onClick={handleDeleteAccount}
                    className="w-full py-4 bg-white dark:bg-slate-900 text-rose-600 font-bold rounded-2xl border-2 border-rose-100 dark:border-rose-500/20 hover:bg-rose-600 hover:text-white transition-all shadow-lg shadow-rose-500/5"
                  >
                    Delete Account
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Profile;

