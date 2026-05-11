import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa"
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
      
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <h1 className="text-3xl font-black tracking-tight mb-6">
              Book<span className="premium-gradient-text">Store</span>
            </h1>
            <p className="text-slate-400 leading-relaxed font-medium">
              Elevating your reading experience with a curated selection of global masterpieces. Join our community of book lovers today.
            </p>
            <div className="flex gap-4 mt-8">
              <SocialIcon icon={<FaFacebook />} href="#" />
              <SocialIcon icon={<FaInstagram />} href="#" />
              <SocialIcon icon={<FaTwitter />} href="#" />
              <SocialIcon icon={<FaLinkedin />} href="#" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-8">Navigation</h2>
            <ul className="space-y-4">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/books">Browse Books</FooterLink>
              <FooterLink to="/categories">Categories</FooterLink>
              <FooterLink to="/about">Our Story</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div className="col-span-1">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-8">Support</h2>
            <ul className="space-y-4">
              <FooterLink to="/contact">Contact Us</FooterLink>
              <FooterLink to="/faq">Help Center</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-1">
            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 mb-8">Newsletter</h2>
            <p className="text-sm text-slate-400 mb-6 font-medium">Subscribe to receive updates on new arrivals and exclusive offers.</p>
            <div className="flex gap-2 p-1.5 bg-slate-800 rounded-2xl border border-slate-700">
               <input 
                 type="email" 
                 placeholder="Enter email" 
                 className="bg-transparent border-none outline-none text-sm px-4 flex-grow placeholder:text-slate-500"
               />
               <button className="bg-blue-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-blue-700 transition-colors">
                 Join
               </button>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-12 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-500 text-sm font-bold">
            © 2026 BookStore Inc. All Rights Reserved.
          </p>
          <div className="flex items-center gap-2 text-slate-500 font-bold text-sm">
             Crafted with ❤️ for <span className="text-white">Readers</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

function SocialIcon({ icon, href }) {
  return (
    <a href={href} className="w-10 h-10 bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all transform hover:-translate-y-1">
      {icon}
    </a>
  )
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link to={to} className="text-slate-400 hover:text-white font-bold transition-colors text-sm">
        {children}
      </Link>
    </li>
  )
}

export default Footer