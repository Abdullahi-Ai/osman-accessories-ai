import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, Loader2 } from 'lucide-react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'

export default function OsmanAIWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I am Osman AI. I can help you find the perfect device, check specs, or compare models. What are you looking for today?" }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isOpen])

  const handleSend = async (e) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setIsLoading(true)

    try {
      // Connect to FastAPI Backend
      const response = await axios.post('http://localhost:8000/api/chat', {
        message: userMessage
      })
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.data.reply }])
    } catch (error) {
      console.error('AI Error:', error)
      setMessages(prev => [...prev, { role: 'assistant', content: 'I am sorry, I am having trouble connecting to my knowledge base right now. Please try again later.' }])
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
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-4 w-[350px] sm:w-[400px] border border-gray-100 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-brand-blue p-4 flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <div className="bg-brand-gold p-1.5 rounded-full">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold font-display">Osman AI</h3>
                  <p className="text-xs text-brand-green font-medium">Online & Ready to help</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand-green text-white rounded-br-sm' 
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-bl-sm shadow-sm flex items-center gap-2">
                    <Loader2 size={16} className="text-brand-gold animate-spin" />
                    <span className="text-xs text-gray-500 font-medium">Thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-4 bg-white border-t border-gray-100">
              <form onSubmit={handleSend} className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Ask about a product..."
                  className="w-full bg-gray-100 rounded-full py-3 pl-4 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-shadow"
                />
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-2 p-2 bg-brand-gold text-white rounded-full hover:bg-yellow-600 disabled:opacity-50 transition-colors shadow-sm"
                >
                  <Send size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-brand-gold rounded-full flex items-center justify-center text-white shadow-lg shadow-brand-gold/30 relative"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-brand-green border-2 border-white"></span>
          </span>
        )}
      </motion.button>
    </div>
  )
}
