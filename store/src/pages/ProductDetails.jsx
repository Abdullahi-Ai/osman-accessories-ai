import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { products } from '../data/products'
import { Star, ShieldCheck, Truck, ArrowLeft, ShoppingCart, Heart, CheckCircle2, Share2, ZoomIn, CreditCard, Bot } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { useCart } from '../context/CartContext'
import { motion } from 'framer-motion'

export default function ProductDetails() {
  const { id } = useParams()
  const product = products.find(p => p.id === parseInt(id))
  const { addToCart } = useCart()
  const [added, setAdded] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const [isZoomed, setIsZoomed] = useState(false)
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-32 text-center h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-3xl font-display font-bold text-brand-blue mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-brand-gold hover:underline font-bold">Return to Shop</Link>
      </div>
    )
  }

  const handleAddToCart = () => {

    for(let i=0; i<quantity; i++) {
      addToCart(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="bg-white pb-24">
      {/* Breadcrumb Nav */}
      <div className="bg-slate-50 border-b border-slate-100 py-4">
        <div className="container mx-auto px-4 md:px-8 flex items-center text-sm">
          <Link to="/" className="text-slate-500 hover:text-brand-gold transition-colors">Home</Link>
          <span className="mx-2 text-slate-300">/</span>
          <Link to="/shop" className="text-slate-500 hover:text-brand-gold transition-colors">Shop</Link>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-slate-400 capitalize">{product.category}</span>
          <span className="mx-2 text-slate-300">/</span>
          <span className="text-brand-blue font-bold truncate max-w-[200px] sm:max-w-none">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <Link to="/shop" className="inline-flex items-center gap-2 text-slate-400 hover:text-brand-gold transition-colors mb-8 font-medium">
          <ArrowLeft size={16} /> Back to Products
        </Link>

        <div className="flex flex-col lg:flex-row gap-16">
          {/* Product Image Gallery */}
          <div className="w-full lg:w-1/2 flex flex-col gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`relative aspect-[4/5] rounded-3xl overflow-hidden bg-slate-50 border border-slate-100 flex items-center justify-center p-8 group ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
              onClick={() => setIsZoomed(!isZoomed)}
            >
              {product.badge && (
                <div className="absolute top-6 left-6 z-10 text-xs font-bold px-4 py-2 rounded-full text-white bg-brand-gold shadow-md">
                  {product.badge}
                </div>
              )}
              
              <div className="absolute top-6 right-6 z-10 flex flex-col gap-3">
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                  <Heart size={20} />
                </button>
                <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-slate-400 hover:text-brand-blue transition-colors shadow-sm">
                  <Share2 size={20} />
                </button>
              </div>

              <img 
                src={product.image} 
                alt={product.name} 
                className={`max-w-full max-h-full object-contain mix-blend-multiply transition-all duration-500 ${isZoomed ? 'scale-150' : 'group-hover:scale-105'}`} 
              />
              
              <div className="absolute bottom-6 right-6 text-slate-400 bg-white/80 p-2 rounded-full backdrop-blur-sm pointer-events-none">
                <ZoomIn size={20} />
              </div>
            </motion.div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={`w-24 h-24 rounded-2xl bg-slate-50 flex-shrink-0 cursor-pointer overflow-hidden p-2 transition-all ${i === 1 ? 'border-2 border-brand-gold opacity-100' : 'border border-slate-100 opacity-60 hover:opacity-100'}`}>
                   <img src={product.image} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                </div>
              ))}
            </div>
          </div>

          {/* Product Information */}
          <div className="w-full lg:w-1/2 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full">{product.brand}</span>
              <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">{product.category}</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-blue mb-6 leading-tight tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-6 mb-8 pb-8 border-b border-slate-100">
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} size={18} className={`${star <= Math.floor(product.rating) ? 'fill-brand-gold text-brand-gold' : 'text-slate-200 fill-slate-200'}`} />
                ))}
              </div>
              <span className="text-sm font-bold text-brand-blue">{product.rating} Rating</span>
              <span className="text-sm text-brand-gold font-medium cursor-pointer hover:underline">{product.reviews} Reviews</span>
            </div>

            <div className="flex items-end gap-4 mb-8">
              <span className="text-5xl font-bold text-brand-blue tracking-tight">KES {product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-2xl text-slate-400 line-through mb-1">KES {product.originalPrice.toLocaleString()}</span>
              )}
            </div>

            <p className="text-slate-600 leading-relaxed mb-10 text-lg">
              {product.description} Discover premium performance wrapped in an elegant design, built to enhance your everyday digital experience.
            </p>

            {/* Quantity & Actions */}
            <div className="bg-slate-50 p-6 rounded-3xl mb-10 border border-slate-100">
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Quantity */}
                <div className="flex items-center bg-white rounded-2xl border border-slate-200 overflow-hidden h-14">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="w-12 h-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-brand-blue transition-colors text-xl font-medium">-</button>
                  <span className="w-12 text-center font-bold text-lg text-brand-blue">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="w-12 h-full flex items-center justify-center text-slate-400 hover:bg-slate-50 hover:text-brand-blue transition-colors text-xl font-medium">+</button>
                </div>
                
                <button 
                  onClick={handleAddToCart}
                  className={`flex-1 h-14 rounded-2xl font-bold transition-all flex items-center justify-center gap-3 text-lg shadow-lg ${added ? 'bg-brand-green text-white shadow-brand-green/30' : 'bg-brand-blue text-white hover:bg-brand-gold shadow-brand-blue/20 hover:shadow-brand-gold/30'}`}
                >
                  {added ? <CheckCircle2 size={24} /> : <ShoppingCart size={24} />}
                  {added ? 'Added to Cart' : 'Add to Cart'}
                </button>
              </div>
              
              <button className="w-full h-14 mt-4 bg-brand-gold hover:bg-yellow-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-brand-gold/30 flex items-center justify-center gap-2 text-lg">
                <CreditCard size={24} /> Buy Now
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-brand-green/10 rounded-full flex items-center justify-center text-brand-green">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue text-sm">1 Year Warranty</h4>
                  <p className="text-xs text-slate-500">Official manufacturer warranty</p>
                </div>
              </div>
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100">
                <div className="w-12 h-12 bg-brand-blue/10 rounded-full flex items-center justify-center text-brand-blue">
                  <Truck size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-blue text-sm">Free Delivery</h4>
                  <p className="text-xs text-slate-500">On all orders above 50K KES</p>
                </div>
              </div>
            </div>

            {/* Tech Specs */}
            {product.specs && (
              <div className="mt-auto">
                <h3 className="font-display font-bold text-2xl text-brand-blue mb-6">Technical Specifications</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                  {Object.entries(product.specs).map(([key, value]) => (
                    <div key={key} className="flex flex-col border-b border-slate-100 pb-3">
                      <span className="text-sm text-slate-400 mb-1">{key}</span>
                      <span className="font-medium text-brand-blue">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Ask AI Button */}
            <div className="mt-12 bg-gradient-to-r from-brand-blue to-[#081020] rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-2xl">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-brand-gold/20 rounded-full blur-3xl"></div>
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shrink-0">
                  <Bot size={32} className="text-brand-gold" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-xl mb-2">Have questions about this {product.brand}?</h4>
                  <p className="text-slate-300 text-sm mb-4">Osman AI can help you compare specs, check compatibility, or understand the warranty.</p>
                  <button className="bg-brand-gold hover:bg-yellow-500 text-white font-bold py-2.5 px-6 rounded-full transition-colors text-sm">
                    Ask Osman AI
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="container mx-auto px-4 md:px-8 pb-24">
        <h3 className="text-3xl font-display font-bold text-brand-blue mb-8">Related Products</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4).map(related => (
            <ProductCard key={related.id} product={related} />
          ))}
        </div>
      </div>
    </div>
  )
}
