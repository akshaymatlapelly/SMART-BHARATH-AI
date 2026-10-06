import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Zap, ChevronDown } from 'lucide-react';
import { sendMessageToGemini } from '../../services/geminiService';

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: '🙏 Hi! I\'m Smart Bharat AI. Ask me anything about government services, schemes, or civic issues!', id: 1 }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;
    const userMsg = { role: 'user', content: text, id: Date.now() };
    setMessages(p => [...p, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const hist = [...messages, userMsg].map(m => ({ role: m.role, content: m.content }));
      const reply = await sendMessageToGemini(hist);
      setMessages(p => [...p, { role: 'assistant', content: reply, id: Date.now() + 1 }]);
    } catch {
      setMessages(p => [...p, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.', id: Date.now() + 1 }]);
    } finally {
      setLoading(false);
    }
  };

  const quickPrompts = ['Passport help', 'PM Kisan', 'Aadhaar update'];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1, type: 'spring', bounce: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(p => !p)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl bg-gradient-to-br from-primary-600 to-accent text-white shadow-2xl flex items-center justify-center"
        style={{ boxShadow: '0 8px 30px rgba(37,99,235,0.5)' }}
        aria-label="Open AI Assistant"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={22} />
            </motion.div>
          ) : (
            <motion.div key="open" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Zap size={22} />
            </motion.div>
          )}
        </AnimatePresence>
        {!open && <span className="absolute -top-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-[#020617] animate-pulse" />}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed bottom-24 right-6 z-50 w-[360px] glass rounded-3xl border border-white/10 shadow-2xl overflow-hidden"
            style={{ boxShadow: '0 25px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05)' }}
          >
            {/* Header */}
            <div className="flex items-center gap-3 p-4 border-b border-white/08">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
              <div className="flex-1">
                <div className="text-white text-sm font-semibold">Smart Bharat AI</div>
                <div className="text-xs text-success flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-success rounded-full inline-block" /> Online
                </div>
              </div>
              <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-white transition-colors p-1">
                <ChevronDown size={18} />
              </button>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-4 space-y-3">
              {messages.map(msg => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-xs leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-br-sm'
                      : 'bg-white/08 text-slate-200 rounded-bl-sm border border-white/06'
                  }`}>
                    {msg.content.replace(/##|##|\*\*/g, '').substring(0, 300)}
                    {msg.content.length > 300 && '...'}
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-white/08 border border-white/06 px-3.5 py-2.5 rounded-2xl rounded-bl-sm">
                    <div className="typing-indicator">
                      <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Quick Prompts */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {quickPrompts.map(p => (
                  <button key={p} onClick={() => { setInput(p); }}
                    className="text-xs px-2.5 py-1.5 glass rounded-lg border border-white/10 text-slate-300 hover:text-accent transition-all">
                    {p}
                  </button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="p-3 border-t border-white/08 flex gap-2">
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && send()}
                placeholder="Ask anything..."
                className="flex-1 bg-white/[0.04] border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-500 outline-none focus:border-primary-500/50 transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={send}
                disabled={!input.trim() || loading}
                className="p-2.5 rounded-xl bg-gradient-to-br from-primary-600 to-accent text-white disabled:opacity-40 flex-shrink-0"
              >
                <Send size={14} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
