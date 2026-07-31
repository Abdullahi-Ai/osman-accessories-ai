import { Link } from 'react-router-dom'
import { ArrowRight, Star, ShieldCheck, Truck, Clock } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const featuredCategories = [
    { name: 'Smartphones', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=800&auto=format&fit=crop', link: '/categories/smartphones' },
    { name: 'Laptops', image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800&auto=format&fit=crop', link: '/categories/laptops' },
    { name: 'Smartwatches', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop', link: '/categories/smartwatches' },
    { name: 'Audio', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop', link: '/categories/audio' }
  ]

  const popularProducts = [
    { id: 1, name: 'Samsung Galaxy S24 Ultra', price: '$1,299.99', oldPrice: '$1,399.99', rating: 4.9, reviews: 124, image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?q=80&w=800&auto=format&fit=crop', badge: 'New Arrival' },
    { id: 2, name: 'Apple iPhone 15 Pro Max', price: '$1,199.99', oldPrice: null, rating: 4.8, reviews: 312, image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=800&auto=format&fit=crop', badge: 'Best Seller' },
    { id: 3, name: 'Sony WH-1000XM5 Headphones', price: '$348.00', oldPrice: '$399.99', rating: 4.7, reviews: 89, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?q=80&w=800&auto=format&fit=crop', badge: '15% OFF' },
    { id: 4, name: 'Apple MacBook Pro M3 14"', price: '$1,599.00', oldPrice: null, rating: 4.9, reviews: 45, image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800&auto=format&fit=crop', badge: null }
  ]

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[600px] bg-brand-dark overflow-hidden flex items-center">
        <div className="absolute inset-0 z-0 opacity-40">
          <img src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2000&auto=format&fit=crop" alt="Premium electronics" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-transparent mix-blend-multiply"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="inline-block py-1 px-3 rounded-full bg-brand-gold/20 text-brand-gold font-bold text-xs uppercase tracking-wider mb-4 border border-brand-gold/30">
              Future of Tech Is Here
            </span>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-gold to-yellow-300">Premium</span> Technology
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              Discover the latest smartphones, accessories, and smart devices at Khalid & Osman Accessories. Quality guaranteed.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/shop" className="bg-brand-gold hover:bg-yellow-500 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center gap-2 shadow-lg shadow-brand-gold/20 hover:shadow-brand-gold/40 transform hover:-translate-y-1">
                Shop Now <ArrowRight size={20} />
              </Link>
              <button className="bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 text-white font-bold py-4 px-8 rounded-full transition-all flex items-center gap-2">
                Talk to Osman AI
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Banner */}
      <section className="bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-100">
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-brand-green/10 flex items-center justify-center mb-4 text-brand-green">
                <ShieldCheck size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-blue">100% Genuine Products</h3>
              <p className="text-gray-500 text-sm">Official warranty on all devices</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center mb-4 text-brand-gold">
                <Truck size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-blue">Fast & Free Delivery</h3>
              <p className="text-gray-500 text-sm">On orders over 50,000 KES</p>
            </div>
            <div className="flex flex-col items-center p-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4 text-blue-600">
                <Clock size={24} />
              </div>
              <h3 className="font-bold text-lg mb-2 text-brand-blue">24/7 AI Support</h3>
              <p className="text-gray-500 text-sm">Get instant help from Osman AI</p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Products */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-3xl font-display font-bold text-brand-blue mb-2">Trending Now</h2>
              <p className="text-gray-500">Discover what our customers are buying</p>
            </div>
            <Link to="/shop" className="text-brand-gold font-bold hover:text-yellow-600 flex items-center gap-1 transition-colors">
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularProducts.map((product) => (
              <motion.div 
                key={product.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all border border-gray-100 group"
              >
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  {product.badge && (
                    <div className={`absolute top-4 left-4 z-10 text-xs font-bold px-3 py-1 rounded-full text-white ${product.badge.includes('OFF') ? 'bg-red-500' : 'bg-brand-gold'}`}>
                      {product.badge}
                    </div>
                  )}
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  
                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="bg-white text-brand-blue font-bold py-3 px-6 rounded-full hover:bg-brand-gold hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-lg">
                      Add to Cart
                    </button>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 fill-brand-gold text-brand-gold" />
                    <span className="text-sm font-bold">{product.rating}</span>
                    <span className="text-xs text-gray-400">({product.reviews})</span>
                  </div>
                  <h3 className="font-bold text-gray-800 mb-2 truncate">{product.name}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-brand-blue">{product.price}</span>
                    {product.oldPrice && (
                      <span className="text-sm text-gray-400 line-through">{product.oldPrice}</span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl font-display font-bold text-brand-blue mb-4">Shop by Category</h2>
            <p className="text-gray-500">Explore our wide range of premium electronics organized just for you.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category, idx) => (
              <Link to={category.link} key={idx} className="relative h-64 rounded-2xl overflow-hidden group">
                <img src={category.image} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-2xl font-bold text-white mb-2">{category.name}</h3>
                  <span className="text-brand-gold font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                    Explore <ArrowRight size={16} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
