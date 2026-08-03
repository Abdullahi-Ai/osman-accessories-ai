import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, Plus, Minus, MessageCircle, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-brand-dark/40 backdrop-blur-sm z-[60]"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[70] flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h2 className="text-xl font-display font-bold text-brand-blue flex items-center gap-2">
                <ShoppingBag size={20} /> Your Cart ({getCartCount()})
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-slate-400">
                  <ShoppingBag size={64} className="mb-4 opacity-20" />
                  <p className="font-medium">Your cart is empty.</p>
                  <button onClick={onClose} className="mt-6 text-brand-gold font-bold hover:underline">
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div key={item.id} className="flex gap-4 border-b border-slate-50 pb-6">
                    <div className="w-20 h-20 bg-slate-50 rounded-xl p-2 border border-slate-100 flex-shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 flex flex-col">
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-bold text-brand-blue line-clamp-2 text-sm leading-tight pr-4">{item.name}</h3>
                        <button onClick={() => removeFromCart(item.id)} className="text-slate-300 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-brand-gold font-bold mb-2 uppercase">{item.brand}</p>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center bg-slate-100 rounded-lg p-0.5">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 hover:bg-white rounded-md transition-colors"><Minus size={14} /></button>
                          <span className="w-6 text-center text-xs font-bold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 hover:bg-white rounded-md transition-colors"><Plus size={14} /></button>
                        </div>
                        <span className="font-bold text-brand-blue">KES {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-slate-500 font-medium">Subtotal</span>
                  <span className="text-2xl font-bold text-brand-blue">KES {subtotal.toLocaleString()}</span>
                </div>
                
                <div className="flex flex-col gap-3">
                  <button onClick={handleCheckout} className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold hover:bg-brand-gold transition-colors shadow-lg">
                    Proceed to Checkout
                  </button>
                  <button onClick={handleCheckout} className="w-full bg-[#25D366] text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-[#20bd5a] transition-colors shadow-lg">
                    <MessageCircle size={20} /> Order via WhatsApp
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
