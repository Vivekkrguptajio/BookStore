import { useState } from "react";
import axios from "axios";

function AddBook({ onBookAdded }) {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_URL = import.meta.env.VITE_API_URL;
    const token = localStorage.getItem("token");

    try {
      await axios.post(`${API_URL}/books`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Book Added Successfully!");
      setFormData({
        title: "",
        author: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });
      if (onBookAdded) onBookAdded();
    } catch (error) {
      console.error("Error adding book:", error.response?.data);
      alert(error.response?.data?.message || "Failed to add book");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-10">
      <h2 className="text-3xl font-bold mb-8 text-blue-600">Add New Book</h2>

      <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        {/* Book Title */}
        <div>
          <label className="block mb-2 font-semibold">Book Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter book title"
            className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
            required
          />
        </div>

        {/* Author */}
        <div>
          <label className="block mb-2 font-semibold">Author Name</label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Enter author name"
            className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block mb-2 font-semibold">Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-2 font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Programming / Business"
            className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
            required
          />
        </div>

        {/* Image URL */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Book Image URL</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="Paste image url"
            className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
          />
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="block mb-2 font-semibold">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="5"
            placeholder="Enter book description"
            className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-4 rounded-xl text-lg font-semibold transition`}
          >
            {loading ? "Adding..." : "Add Book"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBook;
