import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, MessageCircle, Clock } from 'lucide-react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-brand-dark text-slate-300">
      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          <div>
            <Link to="/" className="text-3xl font-display font-black text-white tracking-tight block mb-6 hover:text-brand-gold transition-colors">
              K&O<span className="text-brand-gold">.</span>
            </Link>
            <p className="text-sm leading-relaxed mb-6">
              Premium electronics, smartphones, and mobile accessories. We guarantee 100% genuine products and exceptional customer service.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"><FaFacebook size={18} /></a>
              <a href="https://www.instagram.com/phone_.dealer?utm_source=qr&igsh=aXNnaGl3a3d2cmdo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"><FaInstagram size={18} /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-gold hover:text-white transition-all"><FaTwitter size={18} /></a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 font-display uppercase tracking-wider text-sm">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/shop" className="hover:text-brand-gold transition-colors">Shop All</Link></li>
              <li><Link to="/about" className="hover:text-brand-gold transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-gold transition-colors">Contact Us</Link></li>
              <li><Link to="/faq" className="hover:text-brand-gold transition-colors">FAQs</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 font-display uppercase tracking-wider text-sm">Customer Support</h4>
            <ul className="space-y-3">
              <li><Link to="/policies" className="hover:text-brand-gold transition-colors">Warranty Policy</Link></li>
              <li><Link to="/policies" className="hover:text-brand-gold transition-colors">Delivery Information</Link></li>
              <li><Link to="/policies" className="hover:text-brand-gold transition-colors">Return Policy</Link></li>
              <li><Link to="/policies" className="hover:text-brand-gold transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 font-display uppercase tracking-wider text-sm">Contact Info</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span>Luthuli Avenue,<br/>Nairobi, Kenya</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-brand-gold shrink-0" />
                <span>0781 764 187 / 0726 228 805</span>
              </li>
              <li className="flex items-center gap-3">
                <MessageCircle size={18} className="text-[#25D366] shrink-0" />
                <span>Available on WhatsApp</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-brand-gold shrink-0" />
                <span>osmanibrahim75200@gmail.com</span>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="text-brand-gold shrink-0 mt-0.5" />
                <span className="text-sm">Mon-Sat: 8:00 AM - 5:00 PM<br/>Sun: 9:00 AM - 2:00 PM</span>
              </li>
            </ul>
          </div>
          
        </div>
        
        <div className="border-t border-white/10 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">&copy; {new Date().getFullYear()} Khalid & Osman Accessories. All rights reserved.</p>
          <div className="flex items-center gap-4 text-sm">
            <Link to="/policies" className="hover:text-brand-gold transition-colors">Privacy Policy</Link>
            <span className="text-white/20">|</span>
            <Link to="/policies" className="hover:text-brand-gold transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
