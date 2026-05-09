import { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaTrash, FaEdit, FaCheck, FaTimes, FaShieldAlt } from "react-icons/fa";
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
      alert("Profile updated successfully!");
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
      alert("Account deleted successfully");
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-grow max-w-4xl mx-auto px-8 py-16 w-full">
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl overflow-hidden border dark:border-gray-800">
          {/* Cover / Header */}
          <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
          
          <div className="px-10 pb-10">
            <div className="relative -mt-16 mb-6 flex items-end justify-between flex-wrap gap-6">
              <div className="w-32 h-32 bg-white dark:bg-gray-800 rounded-2xl p-2 shadow-lg">
                <div className="w-full h-full bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <FaUser className="text-5xl" />
                </div>
              </div>
              
              {!isEditing && (
                <button 
                  onClick={() => setIsEditing(true)}
                  className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-blue-700 transition shadow-lg shadow-blue-100 dark:shadow-none"
                >
                  <FaEdit /> Edit Profile
                </button>
              )}
            </div>

            <div className="flex flex-col md:flex-row gap-12">
              {/* Info Section */}
              <div className="flex-grow">
                {isEditing ? (
                  <form onSubmit={handleUpdate} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-5 py-3 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 transition"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-400 uppercase mb-2">Email Address</label>
                      <input 
                        type="email" 
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-gray-800 border-none rounded-xl px-5 py-3 dark:text-white outline-none focus:ring-2 focus:ring-blue-600 transition"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button 
                        type="submit" 
                        disabled={loading}
                        className="bg-green-600 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-green-700 transition"
                      >
                        <FaCheck /> {loading ? "Saving..." : "Save Changes"}
                      </button>
                      <button 
                        type="button" 
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-8 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
                      >
                        <FaTimes /> Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-8">
                    <div>
                      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-2">{user.name}</h1>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold uppercase text-sm">
                        <FaShieldAlt /> {user.role} Account
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-8">
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border dark:border-gray-800">
                        <p className="text-gray-400 text-xs font-bold uppercase mb-2">Email Address</p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200 flex items-center gap-3">
                          <FaEnvelope className="text-blue-600" /> {user.email}
                        </p>
                      </div>
                      <div className="bg-gray-50 dark:bg-gray-800/50 p-6 rounded-2xl border dark:border-gray-800">
                        <p className="text-gray-400 text-xs font-bold uppercase mb-2">Member Since</p>
                        <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                          Recently Joined
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Danger Zone */}
              <div className="md:w-72">
                <div className="bg-red-50 dark:bg-red-900/10 p-8 rounded-3xl border border-red-100 dark:border-red-900/30">
                  <h3 className="text-red-600 dark:text-red-400 font-bold mb-4 flex items-center gap-2">
                    <FaTrash /> Danger Zone
                  </h3>
                  <p className="text-sm text-red-500 mb-6">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <button 
                    onClick={handleDeleteAccount}
                    className="w-full bg-red-600 text-white py-3 rounded-xl font-bold hover:bg-red-700 transition shadow-lg shadow-red-100 dark:shadow-none"
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
