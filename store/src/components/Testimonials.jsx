import React from 'react';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "Tech Enthusiast",
      content: "Khalid & Osman Accessories is my go-to place for all electronics. Their genuine products and exceptional customer service make them the best in Nairobi. The delivery was fast and the packaging was premium.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Ahmed+Hassan&background=0D8ABC&color=fff"
    },
    {
      id: 2,
      name: "Sarah Wanjiku",
      role: "Business Owner",
      content: "I bought a Samsung Galaxy S24 Ultra and the experience was seamless. The Osman AI widget helped me compare different phones before making my decision. Highly recommended!",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=Sarah+Wanjiku&background=10B981&color=fff"
    },
    {
      id: 3,
      name: "David Ochieng",
      role: "Software Developer",
      content: "Finding authentic Apple accessories in Kenya can be tough, but this store delivers every time. Their prices are competitive and the warranty gives peace of mind.",
      rating: 5,
      image: "https://ui-avatars.com/api/?name=David+Ochieng&background=F59E0B&color=fff"
    }
  ];

  return (
    <section className="py-24 bg-white border-y border-slate-100">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-brand-gold font-bold text-sm uppercase tracking-widest mb-2 block">Customer Stories</span>
          <h2 className="text-4xl font-display font-bold text-brand-blue mb-4">What Our Clients Say</h2>
          <p className="text-slate-500 text-lg">Don't just take our word for it. Here is what some of our thousands of satisfied customers have to say.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-slate-50 p-8 rounded-3xl relative">
              <Quote className="absolute top-8 right-8 text-slate-200 w-12 h-12" />
              
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-brand-gold text-brand-gold" />
                ))}
              </div>
              
              <p className="text-slate-700 mb-8 relative z-10 text-lg">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-4 mt-auto">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full" />
                <div>
                  <h4 className="font-bold text-brand-blue">{testimonial.name}</h4>
                  <span className="text-sm text-slate-500">{testimonial.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
