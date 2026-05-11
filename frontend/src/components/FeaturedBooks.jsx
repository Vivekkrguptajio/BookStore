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

  if (loading) return (
    <div className="py-20 text-center">
      <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
      <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Curating masterpieces...</p>
    </div>
  );

  return (
    <section className="py-20 md:py-32 bg-slate-50 dark:bg-[#050810] transition-colors relative overflow-hidden">
      {/* Subtle Decor */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-x-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-16 gap-6">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              Curated <span className="premium-gradient-text">Masterpieces</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg font-medium">
              Handpicked selections from our literary experts, specifically for your sophisticated taste.
            </p>
          </div>
          <Link to="/books" className="flex items-center gap-3 bg-white dark:bg-slate-900 px-6 py-3 rounded-2xl font-bold text-blue-600 shadow-sm hover:shadow-md transition-all group">
            Browse All <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {books.length === 0 ? (
            <div className="col-span-full py-20 card-premium flex flex-col items-center justify-center text-center">
               <p className="text-slate-400 font-bold uppercase tracking-widest">Our shelves are currently being restocked</p>
            </div>
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