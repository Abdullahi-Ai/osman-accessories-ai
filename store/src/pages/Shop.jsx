import { useState, useMemo } from 'react'
import { Filter, Search, SlidersHorizontal, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'
import { products } from '../data/products'
import ProductFilters from '../components/ProductFilters'
import ProductGrid from '../components/ProductGrid'

export default function Shop() {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const initialCategory = queryParams.get('category') || 'All'

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedCategory, setSelectedCategory] = useState(initialCategory)
  const [sortBy, setSortBy] = useState('Featured')
  const [priceRange, setPriceRange] = useState([0, 250000])
  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const brands = ['All', 'Samsung', 'Apple', 'Tecno', 'Infinix', 'OPPO', 'Google Pixel', 'Anker', 'JBL']
  const categories = ['All', 'Smartphones', 'Tablets', 'Smart Watches', 'Wireless Earbuds', 'Power Banks', 'Phone Cases', 'Chargers']
  
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchBrand = selectedBrand === 'All' || p.brand === selectedBrand
      const matchCat = selectedCategory === 'All' || p.category === selectedCategory
      const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchPrice = p.price >= priceRange[0] && p.price <= priceRange[1]
      return matchBrand && matchCat && matchSearch && matchPrice
    }).sort((a, b) => {
      if (sortBy === 'Lowest Price') return a.price - b.price
      if (sortBy === 'Highest Price') return b.price - a.price
      if (sortBy === 'Highest Rated') return b.rating - a.rating
      return 0
    })
  }, [searchTerm, selectedBrand, selectedCategory, sortBy, priceRange])

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Shop Header */}
      <div className="bg-brand-blue pt-16 pb-32 px-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-3xl -mr-64 -mt-64"></div>
        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">Discover Premium Tech</h1>
          <p className="text-slate-300 text-lg max-w-2xl mx-auto">Browse our complete catalog of genuine smartphones, tablets, and mobile accessories. Official warranties included.</p>
        </div>
      </div>

      <div className="container mx-auto max-w-7xl px-4 md:px-8 -mt-20 relative z-20">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <button 
            onClick={() => setShowMobileFilters(!showMobileFilters)}
            className="lg:hidden w-full bg-white text-brand-blue font-bold py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2 border border-slate-100"
          >
            <Filter size={20} />
            {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
          </button>

          {/* Sidebar Filters */}
          <AnimatePresence>
            {(showMobileFilters || window.innerWidth >= 1024) && (
              <ProductFilters 
                brands={brands}
                categories={categories}
                selectedBrand={selectedBrand}
                setSelectedBrand={setSelectedBrand}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
              />
            )}
          </AnimatePresence>

          {/* Main Content */}
          <main className="flex-1">
            
            {/* Top Bar */}
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-slate-100 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input 
                  type="text" 
                  placeholder="Search for a product..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold text-sm font-medium transition-all"
                />
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <span className="text-sm font-medium text-slate-500 whitespace-nowrap">Showing {filteredProducts.length} results</span>
                <div className="relative flex-1 sm:flex-none">
                  <div className="flex items-center gap-2 bg-slate-50 px-4 py-3 rounded-2xl border border-slate-200">
                    <SlidersHorizontal className="text-slate-400 w-4 h-4 shrink-0" />
                    <select 
                      value={sortBy} 
                      onChange={e => setSortBy(e.target.value)}
                      className="bg-transparent border-none text-sm font-bold text-brand-blue focus:outline-none cursor-pointer appearance-none pr-6 w-full"
                    >
                      <option>Featured</option>
                      <option>Lowest Price</option>
                      <option>Highest Price</option>
                      <option>Highest Rated</option>
                    </select>
                    <ChevronDown className="absolute right-4 text-slate-400 w-4 h-4 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            <ProductGrid 
              products={filteredProducts}
              setSearchTerm={setSearchTerm}
              setSelectedBrand={setSelectedBrand}
              setSelectedCategory={setSelectedCategory}
              setPriceRange={setPriceRange}
            />
          </main>
        </div>
      </div>
    </div>
  )
}
