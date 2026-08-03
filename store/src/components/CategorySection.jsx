import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function CategorySection() {
  const featuredCategories = [
    { name: 'Smartphones', image: '/images/samsung_s24.png', link: '/shop?category=Smartphones' },
    { name: 'Tablets', image: '/images/ipad_pro.png', link: '/shop?category=Tablets' },
    { name: 'Smartwatches', image: '/images/smartwatch.png', link: '/shop?category=Smart Watches' },
    { name: 'Accessories', image: '/images/airpods.png', link: '/shop?category=Wireless Earbuds' }
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-4xl font-display font-bold text-brand-blue mb-4">Shop by Category</h2>
          <p className="text-slate-500 text-lg">Explore our wide range of premium electronics organized just for you.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCategories.map((category, idx) => (
            <Link to={category.link} key={idx} className="relative h-[300px] rounded-3xl overflow-hidden group">
              <div className="absolute inset-0 bg-slate-100 p-8 flex items-center justify-center">
                 <img src={category.image} alt={category.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-700" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-blue/90 via-brand-blue/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-display font-bold text-white mb-2">{category.name}</h3>
                <span className="text-brand-gold font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                  Explore <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
