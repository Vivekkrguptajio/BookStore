import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(`${API_URL}/books`);
        setBooks(response.data.books);
      } catch (error) {
        console.error("Error fetching books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [API_URL]);

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-8 py-16 w-full">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Explore Books</h1>
            <p className="text-gray-500 mt-2">Find your next favorite read from our collection</p>
          </div>

          {/* Search Bar */}
          <div className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search by title or author..."
              className="w-full pl-6 pr-12 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-600 outline-none transition"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute right-5 top-1/2 -translate-y-1/2">
               <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book._id} book={{ ...book, rating: book.rating || 4.5 }} />
              ))
            ) : (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500 text-xl font-medium">No books found matching your search.</p>
                <button 
                  onClick={() => setSearchTerm("")}
                  className="mt-4 text-blue-600 font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Books;
