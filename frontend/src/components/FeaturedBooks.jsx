import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import axios from "axios";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";

function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(`${API_URL}/books`);
        setBooks(response.data.books.slice(0, 4));
      } catch (error) {
        console.error("Error fetching featured books:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) return <div className="py-20 text-center text-xl dark:text-white">Loading popular picks...</div>;

  return (
    <section className="py-12 md:py-20 bg-gray-50 dark:bg-gray-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 md:mb-12 gap-4">
          <div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 dark:text-white">Featured Books</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm md:text-lg">Handpicked selections from our experts</p>
          </div>
          <Link to="/books" className="flex items-center gap-2 text-blue-600 font-bold hover:underline">
            Browse All <FaArrowRight size={14} />
          </Link>
        </div>

        {/* Grid - 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {books.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 py-10">No books listed yet.</p>
          ) : (
            books.map((book) => (
              <BookCard key={book._id} book={{ ...book, rating: book.rating || 4.5 }} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default FeaturedBooks;