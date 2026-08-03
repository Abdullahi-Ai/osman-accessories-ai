import React from 'react';
import { Search } from 'lucide-react';
import ProductCard from './ProductCard';

export default function ProductGrid({ 
  products, 
  setSearchTerm, 
  setSelectedBrand, 
  setSelectedCategory, 
  setPriceRange 
}) {
  if (products.length === 0) {
    return (
      <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Search size={32} className="text-slate-300" />
        </div>
        <h3 className="text-2xl font-display font-bold text-brand-blue mb-2">No products found</h3>
        <p className="text-slate-500 max-w-md mx-auto">We couldn't find anything matching your current filters. Try adjusting your search criteria or resetting filters.</p>
        <button 
          onClick={() => {
            setSearchTerm('');
            setSelectedBrand('All');
            setSelectedCategory('All');
            setPriceRange([0, 250000]);
          }}
          className="mt-8 bg-brand-blue text-white px-8 py-3 rounded-xl font-bold hover:bg-brand-gold transition-colors"
        >
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
