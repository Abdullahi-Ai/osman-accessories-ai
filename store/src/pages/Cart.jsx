import React from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getCartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-brand-100 text-brand-600 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} />
        </div>
        <h2 className="text-3xl font-display font-bold text-slate-900 mb-4">Your cart is empty</h2>
        <p className="text-slate-600 mb-8 max-w-md text-center">Looks like you haven't added anything to your cart yet. Browse our products to find something you love!</p>
        <Link to="/shop" className="bg-brand-600 text-white px-8 py-3 rounded-xl font-medium hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/30">
          Start Shopping
        </Link>
      </div>
    );
  }

  const subtotal = getCartTotal();
  const delivery = subtotal > 5000 ? 0 : 300;
  const total = subtotal + delivery;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-display font-bold text-slate-900 mb-8">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
            <ul className="divide-y divide-slate-100">
              {cart.map((item) => (
                <motion.li layout key={item.id} className="p-6 flex flex-col sm:flex-row gap-6 items-center">
                  <div className="w-24 h-24 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-lg font-semibold text-slate-900"><Link to={`/product/${item.id}`}>{item.name}</Link></h3>
                    <p className="text-sm text-slate-500 mb-2">{item.brand}</p>
                    <p className="font-bold text-brand-600">KES {item.price.toLocaleString()}</p>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-100 rounded-lg p-1">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-white rounded-md transition-colors"><Minus size={16} /></button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-white rounded-md transition-colors"><Plus size={16} /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="p-3 text-red-500 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sticky top-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal ({cart.length} items)</span>
                <span className="font-medium text-slate-900">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-medium text-slate-900">{delivery === 0 ? 'Free' : `KES ${delivery.toLocaleString()}`}</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-2xl font-bold text-brand-600">KES {total.toLocaleString()}</span>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-brand-600 text-white py-4 rounded-xl font-semibold text-lg hover:bg-brand-500 transition-colors shadow-lg shadow-brand-500/30 mb-4"
            >
              Continue to Checkout
            </button>
            <Link to="/shop" className="block text-center text-brand-600 font-medium hover:text-brand-700">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
