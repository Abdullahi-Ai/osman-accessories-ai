import { Link } from 'react-router-dom'
import { ShoppingCart, Search, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react'
import CartDrawer from './CartDrawer'
import { motion, AnimatePresence } from 'framer-motion'

export default function Navbar() {
  const { getCartCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);


  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isMobileMenuOpen]);
  
  return (
    <>
      <header className="sticky top-0 z-50 glass">
        <div className="bg-brand-blue text-white text-sm py-2 px-4 text-center font-medium tracking-wide">
          <span className="text-brand-gold mr-2 font-bold">★</span> Free premium delivery on all orders above 50,000 KES <span className="text-brand-gold ml-2 font-bold">★</span>
        </div>
        <div className="container mx-auto px-4 md:px-8 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="text-2xl md:text-3xl font-display font-black text-brand-blue tracking-tight hover:text-brand-gold transition-colors">
                K&O<span className="text-brand-gold">.</span>
              </Link>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8 font-medium text-slate-600">
              <Link to="/" className="hover:text-brand-gold transition-colors font-bold text-brand-blue">Home</Link>
              <Link to="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
              <Link to="/categories" className="hover:text-brand-gold transition-colors">Categories</Link>
              <Link to="/about" className="hover:text-brand-gold transition-colors">About</Link>
              <Link to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
            </nav>
            
            <div className="flex items-center gap-5 sm:gap-6">
              <div className="hidden lg:flex items-center bg-slate-100 rounded-full px-4 py-2 border border-slate-200 focus-within:bg-white focus-within:border-brand-gold focus-within:shadow-md transition-all group">
                <Search className="w-4 h-4 text-slate-400 group-focus-within:text-brand-gold transition-colors" />
                <input type="text" placeholder="Search devices..." className="bg-transparent border-none outline-none text-sm w-48 focus:w-64 transition-all duration-300 ml-2" />
              </div>
              <button 
                aria-label="Cart"
                onClick={() => setIsCartOpen(true)}
                className="text-slate-600 hover:text-brand-gold transition-colors relative group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-brand-gold text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm border-2 border-white">
                    {getCartCount()}
                  </span>
                )}
              </button>
              
              {/* Hamburger Button (Moved to Right) */}
              <button 
                aria-label="Menu"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-brand-blue hover:text-brand-gold transition-colors ml-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white pt-32 px-6 pb-6 overflow-y-auto md:hidden"
          >
            <nav className="flex flex-col gap-6 text-2xl font-display font-bold text-brand-blue">
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/" className="hover:text-brand-gold transition-colors">Home</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/shop" className="hover:text-brand-gold transition-colors">Shop</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/categories" className="hover:text-brand-gold transition-colors">Categories</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/about" className="hover:text-brand-gold transition-colors">About</Link>
              <Link onClick={() => setIsMobileMenuOpen(false)} to="/contact" className="hover:text-brand-gold transition-colors">Contact</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  )
}
