import React from 'react';

export default function FAQ() {
  const faqs = [
    {
      q: "Are your smartphones genuine?",
      a: "Yes, absolutely! Khalid & Osman Accessories specializes in 100% genuine smartphones and accessories. We never sell fake or counterfeit electronic products."
    },
    {
      q: "Do your phones come with a warranty?",
      a: "Yes, every smartphone sold comes with a verified 12-month manufacturer warranty."
    },
    {
      q: "Where is your store located?",
      a: "We are located at Luthuli Avenue, Nairobi, Kenya."
    },
    {
      q: "Do you repair broken phones?",
      a: "No, Khalid & Osman Accessories does not repair phones. However, we can recommend trusted professional repair technicians if you need assistance."
    },
    {
      q: "Do you offer delivery?",
      a: "Yes, we offer fast and reliable delivery across the country."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-display font-bold text-slate-900 mb-12 text-center">Frequently Asked Questions</h1>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-2">{faq.q}</h3>
            <p className="text-slate-600">{faq.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
