import { useState, useEffect } from "react";
import BookCard from "./BookCard";
import axios from "axios";

function FeaturedBooks() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const API_URL = import.meta.env.VITE_API_URL;
      try {
        const response = await axios.get(`${API_URL}/books`);
        setBooks(response.data.books.slice(0, 6));
      } catch (error) {
        console.error("Error fetching featured books:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  if (loading) {
    return <div className="py-20 text-center text-xl dark:text-white">Loading featured books...</div>;
  }

  return (
    <section className="py-20 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Featured Books</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-4 text-lg">Explore our most popular books</p>
        </div>

        {/* Books Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {books.length === 0 ? (
            <p className="col-span-full text-center text-gray-500 dark:text-gray-400">No books available yet.</p>
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