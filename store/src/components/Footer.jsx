import { Link } from 'react-router-dom'
import { Facebook, Twitter, Instagram, MapPin, Phone, Mail } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-blue text-gray-300 pt-16 pb-8 border-t-4 border-brand-gold">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <Link to="/" className="text-3xl font-display font-bold text-white tracking-tight mb-6 block">
              Khalid & Osman<span className="text-brand-gold">.</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6 text-gray-400">
              The premier destination for premium smartphones, tablets, smart devices, and mobile accessories. Bringing the future of technology to your fingertips.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"><Facebook className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"><Twitter className="w-5 h-5" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"><Instagram className="w-5 h-5" /></a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-display">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop" className="hover:text-brand-gold transition-colors">Shop All Products</Link></li>
              <li><Link to="/categories/smartphones" className="hover:text-brand-gold transition-colors">Smartphones</Link></li>
              <li><Link to="/categories/laptops" className="hover:text-brand-gold transition-colors">Laptops & Tablets</Link></li>
              <li><Link to="/categories/accessories" className="hover:text-brand-gold transition-colors">Premium Accessories</Link></li>
              <li><Link to="/deals" className="hover:text-brand-gold transition-colors">Flash Sales & Deals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-display">Customer Service</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/account" className="hover:text-brand-gold transition-colors">My Account</Link></li>
              <li><Link to="/track-order" className="hover:text-brand-gold transition-colors">Track Your Order</Link></li>
              <li><Link to="/policy/returns" className="hover:text-brand-gold transition-colors">Returns & Refunds</Link></li>
              <li><Link to="/policy/warranty" className="hover:text-brand-gold transition-colors">Warranty Information</Link></li>
              <li><Link to="/faq" className="hover:text-brand-gold transition-colors">FAQs</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-display">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-gold shrink-0" />
                <span>Nairobi, Kenya<br />Tech Hub Center, Ground Floor</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-gold shrink-0" />
                <span>+254 700 000 000</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-gold shrink-0" />
                <span>support@khalidosman.com</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-slate-700 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} Khalid & Osman Accessories. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/policy/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/policy/terms" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
