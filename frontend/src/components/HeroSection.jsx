import { useNavigate } from "react-router-dom";
import { FaArrowRight, FaPlay } from "react-icons/fa";

function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <div className="space-y-8 text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-2xl text-xs font-bold uppercase tracking-widest border border-blue-100 dark:border-blue-800 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
            </span>
            New Arrivals for 2024
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900 dark:text-white leading-[1.1] tracking-tight animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Your Gateway to <br />
            <span className="premium-gradient-text">Infinite Knowledge.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Explore a curated collection of world-class literature. From timeless classics to modern breakthroughs, find the stories that move you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <button 
              onClick={() => navigate("/books")}
              className="premium-btn w-full sm:w-auto shadow-2xl shadow-blue-500/20"
            >
              Start Exploring <FaArrowRight />
            </button>
            <button 
              onClick={() => navigate("/signup")}
              className="premium-btn-outline w-full sm:w-auto"
            >
              <FaPlay className="text-xs" /> How it Works
            </button>
          </div>

          <div className="pt-12 border-t dark:border-white/5 animate-in fade-in duration-1000 delay-500">
             <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Trusted by readers at</p>
             <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-500">
                <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" alt="Amazon" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" alt="Google" className="h-5" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" className="h-5" />
             </div>
          </div>
        </div>

        {/* Right Image Container */}
        <div className="relative animate-in zoom-in duration-1000">
          <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] dark:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.8)] border-[12px] border-white dark:border-slate-900 aspect-[4/5] max-w-[450px] mx-auto group">
             <img 
               src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=1000" 
               alt="Books" 
               className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8 text-white">
                <p className="text-sm font-bold uppercase tracking-widest mb-2">Book of the Week</p>
                <h3 className="text-2xl font-black">The Art of Storytelling</h3>
             </div>
          </div>
          
          {/* Floating Stats Card */}
          <div className="absolute -bottom-6 -left-6 md:-left-12 glass-premium rounded-[2rem] p-6 shadow-2xl animate-float z-20 hidden sm:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-500/20 text-green-500 rounded-2xl flex items-center justify-center">
                <FaArrowRight className="-rotate-45" />
              </div>
              <div>
                <p className="text-2xl font-black dark:text-white">12k+</p>
                <p className="text-xs text-slate-500 font-bold uppercase">Happy Readers</p>
              </div>
            </div>
          </div>

          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-600/20 rounded-full blur-3xl -z-0"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-600/20 rounded-full blur-3xl -z-0"></div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;

