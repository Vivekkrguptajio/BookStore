import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaTimes } from "react-icons/fa";
import axios from "axios";

function SellerBooks({ refreshTrigger }) {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingBook, setEditingBook] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books/seller`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks(response.data.books);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await axios.delete(`${API_URL}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Book Deleted");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book");
    }
  };

  const handleEditClick = (book) => {
    setEditingBook(book);
    setEditFormData({ ...book });
  };

  const handleEditChange = (e) => {
    setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/books/${editingBook._id}`, editFormData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Book Updated Successfully");
      setEditingBook(null);
      fetchBooks();
    } catch (error) {
      console.error("Error updating book:", error);
      alert("Failed to update book");
    }
  };

  if (loading) return <div className="text-center p-10 text-xl">Loading Books...</div>;

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 mt-10">
      {/* Heading */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-bold text-blue-600">My Books</h2>
        <p className="text-gray-500 font-semibold">Total Books: {books.length}</p>
      </div>

      {/* Books Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.length === 0 ? (
          <p className="col-span-full text-center text-gray-500 py-10">No books added yet.</p>
        ) : (
          books.map((book) => (
            <div
              key={book._id}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition flex flex-col"
            >
              {/* Image */}
              <img
                src={book.image || "https://images.unsplash.com/photo-1544947950-fa07a98d237f"}
                alt={book.title}
                className="h-64 w-full object-cover"
              />

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <h3 className="text-2xl font-bold text-gray-800 line-clamp-1">{book.title}</h3>
                <p className="text-gray-500 mt-2">{book.author}</p>
                <div className="mt-auto">
                  <h4 className="text-blue-600 text-2xl font-bold mt-4">₹{book.price}</h4>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-6">
                    <button
                      onClick={() => handleEditClick(book)}
                      className="flex-1 bg-yellow-500 text-white py-3 rounded-xl hover:bg-yellow-600 transition flex items-center justify-center gap-2"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id)}
                      className="flex-1 bg-red-500 text-white py-3 rounded-xl hover:bg-red-600 transition flex items-center justify-center gap-2"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setEditingBook(null)}
              className="absolute top-6 right-6 text-2xl text-gray-400 hover:text-gray-600"
            >
              <FaTimes />
            </button>
            <h2 className="text-3xl font-bold mb-8 text-blue-600">Edit Book</h2>
            <form onSubmit={handleUpdate} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block mb-2 font-semibold">Book Title</label>
                <input
                  type="text"
                  name="title"
                  value={editFormData.title}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Author</label>
                <input
                  type="text"
                  name="author"
                  value={editFormData.author}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Price</label>
                <input
                  type="number"
                  name="price"
                  value={editFormData.price}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div>
                <label className="block mb-2 font-semibold">Category</label>
                <input
                  type="text"
                  name="category"
                  value={editFormData.category}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold">Image URL</label>
                <input
                  type="text"
                  name="image"
                  value={editFormData.image}
                  onChange={handleEditChange}
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 font-semibold">Description</label>
                <textarea
                  name="description"
                  value={editFormData.description}
                  onChange={handleEditChange}
                  rows="4"
                  className="w-full border border-gray-300 rounded-xl px-5 py-3 outline-none focus:border-blue-600"
                ></textarea>
              </div>
              <button
                type="submit"
                className="md:col-span-2 bg-blue-600 text-white py-4 rounded-xl text-lg font-semibold hover:bg-blue-700 transition"
              >
                Update Book
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default SellerBooks;
