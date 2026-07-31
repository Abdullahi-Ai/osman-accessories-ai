import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import OsmanAIWidget from './components/OsmanAIWidget'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col relative overflow-x-hidden bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<div className="p-20 text-center"><h1 className="text-4xl font-bold mb-4">Coming Soon</h1><p>This page is currently under development.</p></div>} />
          </Routes>
        </main>
        <Footer />
        <OsmanAIWidget />
      </div>
    </Router>
  )
}

export default App
