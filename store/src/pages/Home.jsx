import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, Clock } from 'lucide-react';
import Hero from '../components/Hero';
import BrandSection from '../components/BrandSection';
import ProductCard from '../components/ProductCard';
import CategorySection from '../components/CategorySection';
import FeaturedProducts from '../components/FeaturedProducts';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import { products } from '../data/products';

export default function Home() {


  return (
    <div className="w-full bg-gray-50">
      <Hero />
      <BrandSection />

      {/* Features Banner */}
      <section className="bg-white border-b border-slate-100">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-blue/5 flex items-center justify-center mb-6 text-brand-blue">
                <ShieldCheck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-brand-blue">100% Genuine Products</h3>
              <p className="text-slate-500 text-sm max-w-xs">Official warranty on all devices directly from manufacturers.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-gold/10 flex items-center justify-center mb-6 text-brand-gold">
                <Truck size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-brand-blue">Fast & Free Delivery</h3>
              <p className="text-slate-500 text-sm max-w-xs">Free delivery on orders over 50,000 KES nationwide.</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-16 h-16 rounded-2xl bg-brand-green/10 flex items-center justify-center mb-6 text-brand-green">
                <Clock size={32} strokeWidth={1.5} />
              </div>
              <h3 className="font-display font-bold text-xl mb-3 text-brand-blue">24/7 AI Support</h3>
              <p className="text-slate-500 text-sm max-w-xs">Get instant, intelligent shopping assistance from Osman AI.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <FeaturedProducts type="trending" />

      {/* Featured Categories */}
      <CategorySection />

      {/* New Arrivals */}
      <FeaturedProducts type="new_arrivals" />

      {/* Testimonials */}
      <Testimonials />

      {/* Newsletter */}
      <Newsletter />
    </div>
  );
}
