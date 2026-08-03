import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    title: "Samsung Galaxy Collection",
    description: "Experience the ultimate performance with the new Galaxy S24 Series. Pre-order now and get free Galaxy Buds.",
    image: "/images/banners/banner1.png",
    color: "from-[#0f172a]"
  },
  {
    id: 2,
    title: "Latest iPhone Series",
    description: "Titanium design. A17 Pro chip. The most powerful iPhone ever created. Available now in all capacities.",
    image: "/images/banners/banner2.png",
    color: "from-slate-900"
  },
  {
    id: 3,
    title: "Premium Accessories",
    description: "Elevate your tech with premium cases, fast chargers, and high-fidelity audio gear.",
    image: "/images/banners/banner3.png",
    color: "from-amber-900"
  }
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <section className="relative h-[500px] md:h-[600px] w-full overflow-hidden bg-brand-dark group">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0"
        >
          <img 
            src={slides[currentSlide].image} 
            alt={slides[currentSlide].title} 
            className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${slides[currentSlide].color} to-transparent opacity-90`}></div>
          
          <div className="container mx-auto px-4 md:px-8 h-full flex flex-col justify-center relative z-10">
            <motion.div 
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="max-w-2xl text-white"
            >
              <span className="inline-block py-1.5 px-4 rounded-full bg-brand-gold/20 text-brand-gold font-bold text-xs uppercase tracking-widest mb-6 border border-brand-gold/30 backdrop-blur-sm">
                Premium Selection
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold leading-tight mb-6 tracking-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-lg font-light leading-relaxed">
                {slides[currentSlide].description}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/shop" className="bg-brand-gold hover:bg-yellow-600 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-brand-gold/20 hover:-translate-y-1">
                  Shop Now <ArrowRight size={20} />
                </Link>
                <button className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 text-white font-semibold py-4 px-8 rounded-full transition-all flex items-center gap-2 hover:-translate-y-1">
                  Talk to Osman AI
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20">
        <ChevronLeft size={24} />
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/20 hover:bg-black/40 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-20">
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-12 h-1.5 rounded-full transition-all ${currentSlide === idx ? 'bg-brand-gold' : 'bg-white/30 hover:bg-white/50'}`}
          />
        ))}
      </div>
    </section>
  );
}
