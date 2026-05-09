import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import BookCard from "../components/BookCard";
import { FaSearch } from "react-icons/fa";

const CATEGORIES = ["All", "Fiction", "Non-Fiction", "Self-Help", "Business", "Programming", "Science"];

function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchParams] = useSearchParams();

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const query = searchParams.get("search");
    if (query) setSearchTerm(query);

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
  }, [API_URL, searchParams]);

  const filteredBooks = books.filter((book) => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = 
      activeCategory === "All" || 
      book.category?.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 w-full">
        {/* Header */}
        <div className="mb-8">
           <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white mb-2">Explore Library</h1>
           <p className="text-sm md:text-lg text-gray-500 dark:text-gray-400 font-medium">Discover your next read from our curated collection.</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col lg:flex-row gap-4 md:gap-6 mb-10 items-center justify-between">
           <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto pb-2 lg:pb-0">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 md:px-5 py-2 md:py-2.5 rounded-xl font-bold whitespace-nowrap text-sm md:text-base transition-all ${
                    activeCategory === cat 
                      ? "bg-blue-600 text-white shadow-md shadow-blue-200 dark:shadow-none" 
                      : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 border dark:border-gray-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
           </div>

           <div className="relative w-full lg:w-80">
              <input
                type="text"
                placeholder="Search books..."
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 transition text-sm md:text-base"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
           </div>
        </div>

        {/* Grid */}
        {loading ? (
          <div className="py-20 text-center text-xl dark:text-white">Loading books...</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
            {filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <BookCard key={book._id} book={{ ...book, rating: book.rating || 4.5 }} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center text-gray-500">
                No books found for your search criteria.
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
