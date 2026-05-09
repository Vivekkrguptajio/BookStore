import { useNavigate } from "react-router-dom";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white min-h-[90vh] flex items-center">
      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Discover Your
            <span className="text-yellow-300"> Favorite Books</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200 leading-8">
            Buy and sell books easily with our modern online bookstore. Explore
            thousands of books from different categories.
          </p>

          <div className="mt-8 flex gap-5">
            <button 
              onClick={() => navigate("/books")}
              className="bg-white text-blue-700 px-8 py-3 rounded-xl font-semibold hover:bg-gray-200 transition"
            >
              Explore Books
            </button>

            <button
              onClick={() => navigate("/seller-register")}
              className="border border-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-700 transition"
            >
              Become Seller
            </button>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1524995997946-a1c2e315a42f"
            alt="Books"
            className="rounded-3xl shadow-2xl w-full max-w-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
