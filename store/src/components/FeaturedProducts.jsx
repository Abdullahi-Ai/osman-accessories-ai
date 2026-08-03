import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

export default function FeaturedProducts({ type = 'trending' }) {

  const displayProducts = type === 'trending' ? products.slice(0, 4) : products.slice(4, 8);
  
  const title = type === 'trending' ? 'Trending Now' : 'New Arrivals';
  const subtitle = type === 'trending' ? 'Top Rated' : 'Just Dropped';

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-2 block">{subtitle}</span>
            <h2 className="text-4xl font-display font-bold text-brand-blue">{title}</h2>
          </div>
          <Link to="/shop" className="hidden sm:flex text-brand-blue font-bold hover:text-brand-gold transition-colors items-center gap-2">
            View All {type === 'trending' ? 'Collection' : ''} <ArrowRight size={20} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        
        <div className="mt-8 text-center sm:hidden">
          <Link to="/shop" className="inline-flex text-brand-blue font-bold hover:text-brand-gold transition-colors items-center gap-2">
            View All <ArrowRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
}
