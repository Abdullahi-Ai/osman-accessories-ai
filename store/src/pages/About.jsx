import React from 'react';
import { ShieldCheck, Target, HeartHandshake, Award } from 'lucide-react';

export default function About() {
  const values = [
    { icon: <ShieldCheck size={32} />, title: "Honesty & Integrity", desc: "We never sell fake or counterfeit electronic products." },
    { icon: <HeartHandshake size={32} />, title: "Trustworthiness", desc: "Building long-term relationships based on mutual trust." },
    { icon: <Award size={32} />, title: "Professionalism", desc: "Delivering expert advice and top-tier service." },
    { icon: <Target size={32} />, title: "Customer First", desc: "Customer satisfaction always comes before profit." }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Header */}
      <div className="bg-brand-blue pt-20 pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-gold/10 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="container mx-auto max-w-4xl relative z-10 text-center">
          <span className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-4 block">Our Story</span>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 tracking-tight">About Khalid & Osman</h1>
          <p className="text-slate-300 text-lg md:text-xl font-light">Your trusted destination for premium, genuine smartphones and mobile accessories in Kenya.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-5xl px-4 -mt-20 relative z-20">
        <div className="bg-white rounded-3xl shadow-xl p-8 md:p-16 border border-slate-100 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold text-brand-blue mb-6">Our Mission</h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                To provide customers with genuine smartphones and high-quality accessories at fair prices, while consistently delivering exceptional and personalized customer service.
              </p>
              <p className="text-slate-600 text-lg leading-relaxed">
                We envision a marketplace where technology is accessible, trustworthy, and enhances the daily lives of our community.
              </p>
            </div>
            <div className="flex flex-col gap-8">
              <div className="bg-slate-50 rounded-3xl p-8 border border-slate-100 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/5 rounded-full blur-2xl"></div>
                <h3 className="text-xl font-bold text-brand-blue mb-6 relative z-10">Why Choose Us?</h3>
                <ul className="space-y-4 relative z-10">
                  <li className="flex items-center gap-3 text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-brand-green/10 text-brand-green flex items-center justify-center shrink-0"><ShieldCheck size={16} /></div>
                    100% Genuine Products Guaranteed
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-brand-blue/10 text-brand-blue flex items-center justify-center shrink-0"><Award size={16} /></div>
                    Official Manufacturer Warranties
                  </li>
                  <li className="flex items-center gap-3 text-slate-700">
                    <div className="w-8 h-8 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center shrink-0"><HeartHandshake size={16} /></div>
                    Dedicated After-Sales Support
                  </li>
                </ul>
              </div>
              
              <div className="rounded-3xl overflow-hidden shadow-lg border border-slate-100 h-64">
                <img src="/images/about/store.png" alt="Khalid & Osman Accessories Store" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-display font-bold text-brand-blue mb-4">Our Core Values</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">The principles that guide our business every single day.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((val, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center group hover:-translate-y-2 transition-transform duration-300">
              <div className="w-20 h-20 mx-auto bg-slate-50 rounded-2xl flex items-center justify-center text-brand-gold mb-6 group-hover:bg-brand-gold group-hover:text-white transition-colors">
                {val.icon}
              </div>
              <h3 className="text-xl font-bold text-brand-blue mb-3">{val.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
