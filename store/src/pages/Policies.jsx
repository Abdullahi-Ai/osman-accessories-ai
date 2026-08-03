import React from 'react';

export default function Policies() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-display font-bold text-slate-900 mb-12">Store Policies</h1>
      
      <div className="space-y-12">
        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Warranty Policy</h2>
          <p className="text-slate-600">Every smartphone sold comes with a verified 12-month warranty. Accessories should include warranty only when explicitly stated.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Delivery Policy</h2>
          <p className="text-slate-600">We offer fast and reliable delivery across the country. Deliveries within Nairobi are processed within hours, while upcountry deliveries take 24-48 hours via trusted courier services.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Return & Exchange Policy</h2>
          <p className="text-slate-600 mb-4">Products can be returned if they are defective out-of-the-box according to standard retail policies. Items must be in their original unopened packaging.</p>
          <p className="text-slate-600">Exchanges are allowed for products of equal or higher value, provided you have the original receipt and the item is in pristine condition.</p>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">Payment Policy</h2>
          <p className="text-slate-600">We accept M-Pesa, Cash, Visa, Mastercard, Airtel Money, and standard secure Bank Transfers.</p>
        </section>
      </div>
    </div>
  );
}
