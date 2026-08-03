import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Tablet, Watch, Headphones, Speaker, Battery, Phone, Usb, Save } from 'lucide-react';

export default function Categories() {
  const allCategories = [
    { name: 'Smartphones', icon: <Smartphone size={40} />, desc: 'Latest flagships and budget phones', link: '/shop?category=Smartphones', color: 'bg-brand-blue' },
    { name: 'Tablets', icon: <Tablet size={40} />, desc: 'iPads and Android tablets', link: '/shop?category=Tablets', color: 'bg-brand-gold' },
    { name: 'Smart Watches', icon: <Watch size={40} />, desc: 'Fitness trackers and smartwatches', link: '/shop?category=Smart Watches', color: 'bg-brand-green' },
    { name: 'Wireless Earbuds', icon: <Headphones size={40} />, desc: 'True wireless and over-ear headphones', link: '/shop?category=Wireless Earbuds', color: 'bg-[#0ea5e9]' },
    { name: 'Bluetooth Speakers', icon: <Speaker size={40} />, desc: 'Portable and home audio systems', link: '/shop?category=Bluetooth Speakers', color: 'bg-[#f43f5e]' },
    { name: 'Power Banks', icon: <Battery size={40} />, desc: 'High capacity portable chargers', link: '/shop?category=Power Banks', color: 'bg-[#8b5cf6]' },
    { name: 'Phone Cases', icon: <Phone size={40} />, desc: 'Premium protective cases', link: '/shop?category=Phone Cases', color: 'bg-[#f97316]' },
    { name: 'Chargers', icon: <Usb size={40} />, desc: 'Fast chargers and adapters', link: '/shop?category=Chargers', color: 'bg-[#14b8a6]' },
    { name: 'USB Cables', icon: <Usb size={40} />, desc: 'Type-C, Lightning, and Micro USB', link: '/shop?category=USB Cables', color: 'bg-[#64748b]' },
    { name: 'Memory Cards', icon: <Save size={40} />, desc: 'MicroSD and storage solutions', link: '/shop?category=Memory Cards', color: 'bg-[#a855f7]' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-brand-blue pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-gold/10 rounded-full blur-3xl -mr-64 -mt-64"></div>
        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <span className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-4 block">Browse Catalog</span>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">All Categories</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Explore our complete range of premium electronics, expertly organized to help you find exactly what you need.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {allCategories.map((cat, idx) => (
            <Link to={cat.link} key={idx} className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className={`w-20 h-20 rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg transition-transform group-hover:scale-110 ${cat.color}`}>
                {cat.icon}
              </div>
              <h3 className="text-xl font-display font-bold text-brand-blue mb-2">{cat.name}</h3>
              <p className="text-slate-500 text-sm mb-6 flex-grow">{cat.desc}</p>
              <div className="mt-auto text-brand-gold font-bold flex items-center gap-2 group-hover:translate-x-2 transition-transform">
                Explore <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
