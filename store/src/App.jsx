import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OsmanAIWidget from './components/OsmanAIWidget'
import Home from './pages/Home'
import Shop from './pages/Shop'
import Categories from './pages/Categories'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import About from './pages/About'
import Contact from './pages/Contact'
import FAQ from './pages/FAQ'
import Policies from './pages/Policies'
import NotFound from './pages/NotFound'
import { CartProvider } from './context/CartContext'
function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-gray-50">
          <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policies" element={<Policies />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <OsmanAIWidget />
        </div>
      </CartProvider>
    </Router>
  )
}

export default App
