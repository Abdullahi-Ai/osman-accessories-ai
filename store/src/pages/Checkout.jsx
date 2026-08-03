import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import { useNavigate } from 'react-router-dom';
import { MessageCircle, CreditCard, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { cart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  });

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = getCartTotal();
  const delivery = subtotal > 5000 ? 0 : 300;
  const total = subtotal + delivery;

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generateWhatsAppMessage = () => {
    let message = `Hello Khalid & Osman Accessories,\n\nI would like to order the following products:\n\n`;
    let calculatedSubtotal = 0;
    
    cart.forEach(item => {
      const trustedProduct = products.find(p => p.id === item.id);
      if (!trustedProduct) return;
      
      const validQty = Math.max(1, Math.min(item.quantity || 1, 99));
      calculatedSubtotal += trustedProduct.price * validQty;
      message += `• ${trustedProduct.name} × ${validQty} — KES ${(trustedProduct.price * validQty).toLocaleString()}\n`;
    });
    
    const calculatedDelivery = calculatedSubtotal > 50000 ? 0 : 300;
    const calculatedTotal = calculatedSubtotal + calculatedDelivery;
    
    message += `\nSubtotal: KES ${calculatedSubtotal.toLocaleString()}`;
    if (calculatedDelivery > 0) message += `\nDelivery: KES ${calculatedDelivery.toLocaleString()}`;
    message += `\n*Total: KES ${calculatedTotal.toLocaleString()}*\n\n`;
    
    const sanitize = (str) => str ? str.trim().substring(0, 150) : '';
    const safeName = sanitize(formData.name);
    const safeAddress = sanitize(formData.address);
    const safeCity = sanitize(formData.city);
    const safeNotes = sanitize(formData.notes);

    if (safeName) message += `Customer Name: ${safeName}\n`;
    if (safeAddress) message += `Delivery Address: ${safeAddress}, ${safeCity}\n`;
    if (safeNotes) message += `Notes: ${safeNotes}\n`;
    
    message += `\nPlease confirm availability and delivery options.\n\nThank you.`;
    
    return encodeURIComponent(message);
  };

  const handleWhatsAppCheckout = () => {
    const phoneNumber = "254781764187";
    const url = `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`;
    window.open(url, '_blank');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate('/shop')} className="flex items-center gap-2 text-slate-500 hover:text-brand-gold mb-8 font-medium transition-colors">
        <ArrowLeft size={20} /> Continue Shopping
      </button>
      
      <h1 className="text-4xl font-display font-bold text-brand-blue mb-8 tracking-tight">Secure Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Delivery Information</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Full Name *</label>
                  <input type="text" name="name" onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold" placeholder="John Doe" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number *</label>
                  <input type="tel" name="phone" onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold" placeholder="0700 000 000" required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address (Optional)</label>
                <input type="email" name="email" onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold" placeholder="john@example.com" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-slate-700 mb-2">Delivery Address *</label>
                  <input type="text" name="address" onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold" placeholder="Street name, Building, Apartment number" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">City / Area *</label>
                  <input type="text" name="city" onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold" placeholder="e.g. Nairobi CBD, Westlands" required />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Order Notes (Optional)</label>
                <textarea name="notes" onChange={handleInputChange} rows="3" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold" placeholder="Any special instructions for delivery..."></textarea>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 sticky top-32">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between items-start text-sm">
                  <span className="text-slate-600 flex-1 pr-4">{item.quantity}x {item.name}</span>
                  <span className="font-medium text-slate-900">KES {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t border-slate-100 pt-4 space-y-3 text-slate-600 mb-6">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-bold text-brand-blue">KES {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span className="font-bold text-brand-blue">{delivery === 0 ? 'Free' : `KES ${delivery.toLocaleString()}`}</span>
              </div>
              <div className="border-t border-slate-100 pt-4 flex justify-between items-center mt-2">
                <span className="text-lg font-bold text-slate-500 uppercase tracking-widest text-sm">Total</span>
                <span className="text-3xl font-display font-bold text-brand-blue">KES {total.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="space-y-4">
              <button 
                onClick={handleWhatsAppCheckout}
                className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-4 rounded-xl font-semibold text-lg hover:bg-[#20bd5a] transition-colors shadow-lg shadow-[#25D366]/30"
              >
                <MessageCircle size={24} /> Complete via WhatsApp
              </button>
              
              <button 
                className="w-full flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-semibold text-lg hover:bg-slate-800 transition-colors shadow-lg"
              >
                <CreditCard size={24} /> Pay Securely Online
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
