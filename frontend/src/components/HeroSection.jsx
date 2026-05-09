import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="bg-white dark:bg-gray-950 py-10 md:py-20 lg:py-32 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 grid lg:grid-cols-2 gap-10 md:gap-12 items-center text-center lg:text-left">
        {/* Left Content */}
        <div className="space-y-6 md:space-y-8 order-2 lg:order-1">
          <div className="inline-block px-4 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-widest">
            Welcome to BookStore
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
            Discover Your Next <br />
            <span className="text-blue-600">Great Adventure.</span>
          </h1>
          
          <p className="text-sm md:text-lg text-gray-600 dark:text-gray-400 max-w-lg mx-auto lg:mx-0 leading-relaxed">
            Browse through thousands of books from world-class authors. From fiction to business, we have everything you need to fuel your mind.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
            <button 
              onClick={() => navigate("/books")}
              className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-lg shadow-blue-200 dark:shadow-none"
            >
              Start Exploring
            </button>
            <button 
              onClick={() => navigate("/signup")}
              className="w-full sm:w-auto px-8 py-4 border border-gray-200 dark:border-gray-800 dark:text-white rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-gray-900 transition"
            >
              Join for Free
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-6 grayscale opacity-60 scale-75 md:scale-100">
             <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-4 md:h-6" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-4 md:h-6" />
             <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-4 md:h-6" />
          </div>
        </div>

        {/* Right Image */}
        <div className="relative flex justify-center order-1 lg:order-2">
          <div className="relative z-10 rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl border-4 md:border-8 border-white dark:border-gray-900 w-full max-w-[280px] md:max-w-md aspect-[3/4]">
             <img 
               src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000" 
               alt="Books" 
               className="w-full h-full object-cover"
             />
          </div>
          {/* Decorative Elements (Hidden on very small screens) */}
          <div className="hidden sm:block absolute -top-10 -right-10 w-20 md:w-40 h-20 md:h-40 bg-blue-600/10 rounded-full -z-0"></div>
          <div className="hidden sm:block absolute -bottom-10 -left-10 w-20 md:w-40 h-20 md:h-40 bg-purple-600/10 rounded-full -z-0"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
