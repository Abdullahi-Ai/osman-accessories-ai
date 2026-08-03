import React from 'react';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <div className="text-9xl font-display font-bold text-brand-blue mb-6">404</div>
        <h1 className="text-3xl font-display font-bold text-slate-900 mb-4">Page Not Found</h1>
        <p className="text-slate-500 mb-8 text-lg">
          Oops! The page you are looking for doesn't exist, has been removed, or is temporarily unavailable.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            to="/"
            className="w-full sm:w-auto px-8 py-4 bg-brand-blue text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-blue/90 transition-colors"
          >
            <Home size={20} /> Back to Home
          </Link>
          <Link 
            to="/shop"
            className="w-full sm:w-auto px-8 py-4 bg-white text-brand-blue border border-slate-200 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
          >
            <ArrowLeft size={20} /> Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
