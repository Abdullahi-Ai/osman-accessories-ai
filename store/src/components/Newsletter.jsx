import React from 'react';
import { Send } from 'lucide-react';

export default function Newsletter() {
  return (
    <section className="py-24 bg-brand-blue relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/20 rounded-full blur-3xl -mr-64 -mt-64"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-green/20 rounded-full blur-3xl -ml-64 -mb-64"></div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Stay Updated</h2>
          <p className="text-slate-300 text-lg mb-10">Subscribe to our newsletter to receive the latest tech news, exclusive deals, and early access to our new arrivals.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              required
              className="flex-1 px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-gold focus:border-brand-gold backdrop-blur-sm"
            />
            <button 
              type="submit" 
              className="px-8 py-4 bg-brand-gold text-white font-bold rounded-2xl hover:bg-brand-gold/90 transition-colors flex items-center justify-center gap-2"
            >
              Subscribe <Send size={20} />
            </button>
          </form>
          <p className="text-slate-400 text-sm mt-4">We respect your privacy. No spam, ever.</p>
        </div>
      </div>
    </section>
  );
}
