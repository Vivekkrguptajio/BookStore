import {
  FaLaptopCode,
  FaBusinessTime,
  FaBrain,
  FaFlask,
  FaBook,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa"

function Categories() {

  const categories = [
    {
      id: 1,
      name: "Programming",
      icon: <FaLaptopCode />,
      color: "bg-blue-500",
    },

    {
      id: 2,
      name: "Business",
      icon: <FaBusinessTime />,
      color: "bg-purple-500",
    },

    {
      id: 3,
      name: "Self Growth",
      icon: <FaBrain />,
      color: "bg-green-500",
    },

    {
      id: 4,
      name: "Science",
      icon: <FaFlask />,
      color: "bg-red-500",
    },

    {
      id: 5,
      name: "History",
      icon: <FaBook />,
      color: "bg-orange-500",
    },

    {
      id: 6,
      name: "World",
      icon: <FaGlobe />,
      color: "bg-indigo-500",
    },
  ]

  return (
    <section className="py-20 md:py-32 bg-white dark:bg-[#050810] transition-colors">

      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div className="max-w-2xl text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4 tracking-tight">
              Explore by <span className="premium-gradient-text">Category</span>
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Dive deep into our extensive collection of curated books across multiple genres.
            </p>
          </div>
          <button className="hidden md:flex items-center gap-2 text-blue-600 font-bold group">
            View All Genres <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">

          {categories.map((category) => (

            <div
              key={category.id}
              className="card-premium group p-8 flex flex-col items-center text-center hover:-translate-y-2 transition-all duration-500 border-none bg-slate-50 dark:bg-slate-900/40"
            >

              <div className={`w-16 h-16 rounded-2xl ${category.color} text-white flex items-center justify-center text-3xl mb-6 shadow-lg shadow-${category.color.split('-')[1]}-500/20 group-hover:scale-110 transition-transform duration-500`}>
                {category.icon}
              </div>

              <h2 className="text-lg font-bold text-slate-800 dark:text-white group-hover:text-blue-600 transition-colors">
                {category.name}
              </h2>
              
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                120+ Books
              </p>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default Categories