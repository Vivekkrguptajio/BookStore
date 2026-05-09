import {
  FaLaptopCode,
  FaBusinessTime,
  FaBrain,
  FaFlask,
  FaBook,
  FaGlobe,
} from "react-icons/fa"

function Categories() {

  const categories = [
    {
      id: 1,
      name: "Programming",
      icon: <FaLaptopCode />,
    },

    {
      id: 2,
      name: "Business",
      icon: <FaBusinessTime />,
    },

    {
      id: 3,
      name: "Self Growth",
      icon: <FaBrain />,
    },

    {
      id: 4,
      name: "Science",
      icon: <FaFlask />,
    },

    {
      id: 5,
      name: "History",
      icon: <FaBook />,
    },

    {
      id: 6,
      name: "World",
      icon: <FaGlobe />,
    },
  ]

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-8">

        {/* Heading */}
        <div className="text-center mb-14">

          <h1 className="text-4xl font-bold text-gray-800">
            Book Categories
          </h1>

          <p className="text-gray-500 mt-4 text-lg">
            Find books from your favorite category
          </p>

        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-8">

          {categories.map((category) => (

            <div
              key={category.id}
              className="bg-gray-100 rounded-2xl p-8 flex flex-col items-center justify-center hover:bg-blue-600 hover:text-white transition duration-300 cursor-pointer shadow-md"
            >

              <div className="text-5xl mb-5">
                {category.icon}
              </div>

              <h2 className="text-lg font-semibold">
                {category.name}
              </h2>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}

export default Categories