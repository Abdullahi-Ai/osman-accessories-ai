import React, { useState } from 'react';
import { Star, ShoppingCart, CheckCircle2, Eye, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-slate-100 group flex flex-col h-full"
    >
      <div className="relative aspect-square bg-slate-50 overflow-hidden block">
        {product.badge && (
          <div className={`absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1.5 rounded-full text-white shadow-sm backdrop-blur-md ${product.badge.includes('OFF') ? 'bg-red-500/90' : 'bg-brand-blue/90'}`}>
            {product.badge}
          </div>
        )}
        
        {/* Warranty Badge */}
        <div className="absolute top-4 right-4 z-10 text-xs font-medium px-2 py-1 rounded bg-white/80 backdrop-blur-md border border-slate-200 text-slate-600 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <ShieldCheck size={12} className="text-brand-green" /> 1Y Warranty
        </div>

        <Link to={`/product/${product.id}`} className="block w-full h-full p-6">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-700" 
          />
        </Link>
        
        {/* Quick Actions */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0 z-10">
          <button 
            onClick={handleAddToCart}
            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold shadow-lg transition-colors ${added ? 'bg-brand-green text-white' : 'bg-white text-brand-blue hover:bg-brand-blue hover:text-white'}`}
          >
            {added ? <CheckCircle2 size={18} /> : <ShoppingCart size={18} />}
            {added ? 'Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="text-xs text-brand-gold font-bold uppercase tracking-wider mb-2">{product.brand}</div>
        
        <Link to={`/product/${product.id}`} className="font-display font-bold text-lg text-brand-blue mb-2 line-clamp-2 hover:text-brand-gold transition-colors">
          {product.name}
        </Link>
        
        <div className="flex items-center gap-1 mb-4">
          <div className="flex text-brand-gold">
            {[1,2,3,4,5].map(star => (
              <Star key={star} size={14} className={star <= Math.floor(product.rating) ? "fill-brand-gold" : "text-slate-200 fill-slate-200"} />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-700 ml-1">{product.rating}</span>
          <span className="text-xs text-slate-400">({product.reviews})</span>
        </div>

        {/* Mini Specs */}
        {product.specs && (
          <div className="flex flex-wrap gap-2 mb-4 mt-auto">
            {product.specs.RAM && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded">{product.specs.RAM}</span>}
            {product.specs.Storage && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded">{product.specs.Storage}</span>}
            {product.specs.Battery && <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded">{product.specs.Battery}</span>}
          </div>
        )}

        <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-50">
          <div>
            <span className="text-sm text-slate-400 block mb-0.5">Price</span>
            <span className="text-xl font-bold text-brand-blue">KES {product.price.toLocaleString()}</span>
          </div>
          {product.originalPrice && (
            <div className="text-right">
              <span className="text-xs text-red-500 font-medium block">Save KES {(product.originalPrice - product.price).toLocaleString()}</span>
              <span className="text-sm text-slate-400 line-through block">KES {product.originalPrice.toLocaleString()}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
