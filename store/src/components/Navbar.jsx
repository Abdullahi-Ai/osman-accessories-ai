import { Link } from 'react-router-dom'
import { ShoppingCart, User, Heart, Search, Menu } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 glass">
      <div className="bg-brand-blue text-white text-sm py-1.5 px-4 text-center font-medium tracking-wide shadow-inner">
        Free premium delivery on all orders above 50,000 KES | Shop the future today
      </div>
      <div className="container mx-auto px-4 md:px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-brand-blue hover:text-brand-gold transition-colors"><Menu /></button>
            <Link to="/" className="text-2xl md:text-3xl font-display font-bold text-brand-blue tracking-tight">
              Khalid & Osman<span className="text-brand-gold">.</span>
            </Link>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-600">
            <Link to="/" className="hover:text-brand-gold transition-colors text-brand-blue font-bold">Home</Link>
            <Link to="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
            <Link to="/categories" className="hover:text-brand-gold transition-colors">Categories</Link>
            <Link to="/deals" className="hover:text-brand-gold transition-colors flex items-center gap-1">Deals <span className="flex h-2 w-2 rounded-full bg-brand-gold"></span></Link>
            <Link to="/about" className="hover:text-brand-gold transition-colors">About</Link>
          </nav>
          
          <div className="flex items-center gap-6">
            <div className="hidden lg:flex items-center bg-gray-100 rounded-full px-4 py-2 border border-gray-200 focus-within:bg-white focus-within:border-brand-gold focus-within:shadow-md transition-all group">
              <Search className="w-4 h-4 text-gray-400 group-focus-within:text-brand-gold transition-colors" />
              <input type="text" placeholder="Search amazing devices..." className="bg-transparent border-none outline-none text-sm w-48 focus:w-64 transition-all duration-300 ml-2" />
            </div>
            <Link to="/wishlist" className="text-gray-600 hover:text-brand-gold transition-colors"><Heart className="w-5 h-5" /></Link>
            <Link to="/account" className="text-gray-600 hover:text-brand-gold transition-colors"><User className="w-5 h-5" /></Link>
            <Link to="/cart" className="text-gray-600 hover:text-brand-gold transition-colors relative group">
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
