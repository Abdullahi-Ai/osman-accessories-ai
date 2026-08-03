import React from 'react';
import { motion } from 'framer-motion';

const brands = [
  { name: 'Samsung', logo: 'SAMSUNG' },
  { name: 'Apple', logo: ' Apple' },
  { name: 'Tecno', logo: 'TECNO' },
  { name: 'Infinix', logo: 'Infinix' },
  { name: 'OPPO', logo: 'OPPO' },
  { name: 'Oraimo', logo: 'oraimo' },
  { name: 'JBL', logo: 'JBL' },
  { name: 'Anker', logo: 'ANKER' }
];

export default function BrandSection() {
  return (
    <section className="bg-white py-12 border-b border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-center text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">Trusted by Global Brands</h2>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
          {brands.map((brand, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ scale: 1.1 }}
              className="text-2xl md:text-3xl font-display font-black text-brand-blue/80 hover:text-brand-blue hover:scale-110 cursor-pointer transition-all duration-300"
            >
              {brand.logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
