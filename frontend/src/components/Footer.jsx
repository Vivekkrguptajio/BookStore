import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa"

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">

      <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-3 gap-10">

        {/* Logo */}
        <div>

          <h1 className="text-3xl font-bold text-blue-400">
            BookStore
          </h1>

          <p className="mt-4 text-gray-400 leading-7">
            Discover thousands of books from different categories.
            Buy and sell books easily with our modern platform.
          </p>

        </div>

        {/* Quick Links */}
        <div>

          <h2 className="text-2xl font-semibold mb-5">
            Quick Links
          </h2>

          <ul className="space-y-3 text-gray-400">

            <li className="hover:text-white cursor-pointer">
              Home
            </li>

            <li className="hover:text-white cursor-pointer">
              Books
            </li>

            <li className="hover:text-white cursor-pointer">
              About
            </li>

            <li className="hover:text-white cursor-pointer">
              Contact
            </li>

          </ul>

        </div>

        {/* Social */}
        <div>

          <h2 className="text-2xl font-semibold mb-5">
            Follow Us
          </h2>

          <div className="flex gap-5 text-3xl">

            <FaFacebook className="hover:text-blue-500 cursor-pointer" />

            <FaInstagram className="hover:text-pink-500 cursor-pointer" />

            <FaTwitter className="hover:text-sky-400 cursor-pointer" />

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center text-gray-500">

        © 2026 BookStore. All Rights Reserved.

      </div>

    </footer>
  )
}

export default Footer