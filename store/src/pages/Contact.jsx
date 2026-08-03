import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

export default function Contact() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24">
      <div className="text-center mb-16">
        <span className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-4 block">Get in Touch</span>
        <h1 className="text-5xl font-display font-bold text-brand-blue tracking-tight">Contact Us</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div>
          <h2 className="text-3xl font-display font-bold text-brand-blue mb-8">We're Here to Help</h2>
          <div className="space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-brand-blue/5 text-brand-blue rounded-2xl flex items-center justify-center flex-shrink-0">
                <MapPin size={28} />
              </div>
              <div>
                <h3 className="font-bold text-brand-blue text-lg mb-1">Location</h3>
                <p className="text-slate-600 leading-relaxed">Luthuli Avenue, Nairobi, Kenya</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center flex-shrink-0">
                <Phone size={28} />
              </div>
              <div>
                <h3 className="font-bold text-brand-blue text-lg mb-1">Phone Numbers</h3>
                <p className="text-slate-600">0781 764 187</p>
                <p className="text-slate-600">0726 228 805</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-[#25D366]/10 text-[#25D366] rounded-2xl flex items-center justify-center flex-shrink-0">
                <MessageCircle size={28} />
              </div>
              <div>
                <h3 className="font-bold text-brand-blue text-lg mb-1">WhatsApp</h3>
                <p className="text-slate-600 leading-relaxed">Both phone numbers are available on WhatsApp for quick support.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-brand-blue/5 text-brand-blue rounded-2xl flex items-center justify-center flex-shrink-0">
                <Mail size={28} />
              </div>
              <div>
                <h3 className="font-bold text-brand-blue text-lg mb-1">Email</h3>
                <p className="text-slate-600">osmanibrahim75200@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start gap-6">
              <div className="w-14 h-14 bg-brand-gold/10 text-brand-gold rounded-2xl flex items-center justify-center flex-shrink-0">
                <Clock size={28} />
              </div>
              <div>
                <h3 className="font-bold text-brand-blue text-lg mb-1">Business Hours</h3>
                <p className="text-slate-600">Monday to Saturday: 8:00 AM – 5:00 PM</p>
                <p className="text-slate-600">Sunday: 9:00 AM – 2:00 PM</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 h-fit sticky top-32">
          <h2 className="text-2xl font-display font-bold text-brand-blue mb-8">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
              <input type="text" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all" placeholder="Your Name" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input type="email" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all" placeholder="your@email.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
              <textarea rows="5" className="w-full px-5 py-4 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all" placeholder="How can we help you?"></textarea>
            </div>
            <button className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold hover:bg-brand-gold transition-colors shadow-lg">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
