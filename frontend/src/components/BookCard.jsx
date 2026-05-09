import { FaStar, FaShoppingCart } from "react-icons/fa"

function BookCard({ book }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition duration-300">

      {/* Image */}
      <img
        src={book.image}
        alt={book.title}
        className="h-72 w-full object-cover"
      />

      {/* Content */}
      <div className="p-5">

        <h2 className="text-xl font-bold text-gray-800">
          {book.title}
        </h2>

        <p className="text-gray-500 mt-1">
          {book.author}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-3 text-yellow-500">
          <FaStar />
          <span>{book.rating}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between mt-5">

          <h3 className="text-2xl font-bold text-blue-600">
            ₹{book.price}
          </h3>

          <button className="bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition">
            <FaShoppingCart />
          </button>

        </div>

      </div>

    </div>
  )
}

export default BookCard