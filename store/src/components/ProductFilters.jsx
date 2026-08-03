import React from 'react';
import { Filter } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProductFilters({
  brands,
  categories,
  selectedBrand,
  setSelectedBrand,
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange
}) {
  return (
    <motion.aside 
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="w-full lg:w-72 shrink-0 lg:block overflow-hidden lg:overflow-visible"
    >
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 sticky top-24">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-full bg-brand-blue/5 flex items-center justify-center text-brand-blue">
            <Filter size={20} />
          </div>
          <h2 className="font-display font-bold text-xl text-brand-blue">Filters</h2>
        </div>
        
        {/* Category Filter */}
        <div className="mb-8">
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Categories</h3>
          <div className="space-y-3">
            {categories.map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedCategory === cat ? 'bg-brand-gold border-brand-gold' : 'border-slate-300 group-hover:border-brand-gold'}`}>
                  {selectedCategory === cat && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                </div>
                <input 
                  type="radio" 
                  name="category" 
                  checked={selectedCategory === cat} 
                  onChange={() => setSelectedCategory(cat)}
                  className="hidden"
                />
                <span className={`text-sm font-medium transition-colors ${selectedCategory === cat ? 'text-brand-blue font-bold' : 'text-slate-600 group-hover:text-brand-blue'}`}>{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-8">
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Brands</h3>
          <div className="space-y-3 max-h-48 overflow-y-auto pr-2 scrollbar-hide">
            {brands.map(brand => (
              <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${selectedBrand === brand ? 'bg-brand-blue border-brand-blue' : 'border-slate-300 group-hover:border-brand-blue'}`}>
                  {selectedBrand === brand && <div className="w-2.5 h-2.5 bg-white rounded-sm" />}
                </div>
                <input 
                  type="radio" 
                  name="brand" 
                  checked={selectedBrand === brand} 
                  onChange={() => setSelectedBrand(brand)}
                  className="hidden"
                />
                <span className={`text-sm font-medium transition-colors ${selectedBrand === brand ? 'text-brand-blue font-bold' : 'text-slate-600 group-hover:text-brand-blue'}`}>{brand}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Filter */}
        <div className="mb-4">
          <h3 className="font-bold mb-4 text-sm uppercase tracking-wider text-slate-400">Max Price (KES)</h3>
          <input 
            type="range" 
            min="0" 
            max="250000" 
            step="5000"
            value={priceRange[1]} 
            onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
            className="w-full accent-brand-gold h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-sm font-bold text-brand-blue mt-4">
            <span>KES 0</span>
            <span>KES {priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>
    </motion.aside>
  );
}
