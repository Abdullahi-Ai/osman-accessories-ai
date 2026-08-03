import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, Loader2, Sparkles, Phone, ShieldCheck, MapPin, Search } from 'lucide-react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function OsmanAIWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Welcome to Khalid & Osman Accessories! I'm Osman AI, your premium shopping assistant. How can I help you find the perfect device today?" }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const quickActions = [
    { text: "Product Search", icon: <Search size={14} />, query: "I'm looking for a new smartphone." },
    { text: "Compare Phones", icon: <Phone size={14} />, query: "Can you compare the latest Samsung and iPhone models?" },
    { text: "Accessories", icon: <Sparkles size={14} />, query: "What accessories do you recommend?" },
    { text: "Warranty Info", icon: <ShieldCheck size={14} />, query: "What is your warranty policy?" }
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen, isLoading])

  const handleSend = async (text) => {
    const userMessage = typeof text === 'string' ? text.trim() : input.trim()
    if (!userMessage || isLoading) return

    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      const apiUrl = `http://${window.location.hostname}:8000/api/chat`
      const response = await axios.post(apiUrl, {
        message: userMessage
      })
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }])
    } catch (error) {
      console.error('AI Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'I am currently unable to reach my knowledge base. Please try again in a moment.' }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-6 w-[350px] sm:w-[420px] border border-slate-100 flex flex-col h-[600px] z-[80]"
          >
            {/* Premium Header */}
            <div className="bg-brand-blue p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-gold/20 rounded-full blur-3xl -mr-10 -mt-10"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-brand-gold/10 rounded-full blur-2xl -ml-10 -mb-10"></div>
              
              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-4">
                  <div className="bg-gradient-to-br from-brand-gold to-yellow-500 p-2.5 rounded-2xl shadow-lg shadow-brand-gold/30 border border-white/20">
                    <Bot size={24} className="text-brand-blue" />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-white tracking-tight">Osman AI</h3>
                    <p className="text-xs text-brand-gold font-medium flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse"></span>
                      Online & Ready
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/80 hover:text-white transition-colors backdrop-blur-sm border border-white/10"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50 flex flex-col gap-5 scrollbar-hide">
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 justify-end mb-2">
                  {quickActions.map((action, idx) => (
                    <button 
                      key={idx}
                      onClick={() => handleSend(action.query)}
                      className="text-xs font-medium bg-white text-slate-600 border border-slate-200 px-3 py-1.5 rounded-full hover:border-brand-gold hover:text-brand-blue transition-colors flex items-center gap-1.5 shadow-sm hover:shadow"
                    >
                      {action.icon} {action.text}
                    </button>
                  ))}
                </div>
              )}
              
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-blue text-white rounded-br-sm' 
                      : 'bg-white text-slate-700 border border-slate-100 rounded-bl-sm shadow-[0_2px_10px_-3px_rgba(6,81,237,0.1)]'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-100 p-4 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-1.5 h-1.5 bg-brand-gold rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium tracking-wide">Processing...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-slate-100 relative">
              <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask Osman AI..."
                  className="w-full bg-slate-50 border border-slate-200 text-slate-700 rounded-full py-3.5 pl-5 pr-14 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 focus:border-brand-gold transition-all shadow-inner"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 w-10 h-10 bg-brand-gold text-white rounded-full flex items-center justify-center hover:bg-yellow-500 disabled:opacity-40 disabled:hover:bg-brand-gold transition-colors shadow-md"
                >
                  <Send size={16} className="ml-0.5" />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[9px] text-slate-400 font-medium tracking-wider uppercase">Powered by Khalid & Osman AI</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-gradient-to-br from-brand-blue to-[#081020] rounded-full flex items-center justify-center text-white shadow-[0_10px_25px_-5px_rgba(15,23,42,0.5)] relative border border-white/10 z-[80]"
      >
        {isOpen ? <X size={26} /> : <Bot size={28} className="text-brand-gold" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-gold opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-gold border-2 border-brand-blue"></span>
          </span>
        )}
      </motion.button>
    </div>
  )
}
