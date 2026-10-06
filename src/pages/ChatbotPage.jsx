import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send, Mic, MicOff, Volume2, VolumeX, RotateCcw, 
  Copy, ThumbsUp, ThumbsDown, Sparkles, User, 
  MessageSquare, ChevronDown, Zap
} from 'lucide-react';
import { sendMessageToGemini } from '../services/geminiService';
import toast from 'react-hot-toast';
// MarkdownContent renderer defined inline below

// ===== TYPING INDICATOR =====
function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-4">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center flex-shrink-0">
        <Zap size={14} className="text-white" />
      </div>
      <div className="glass-card px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="typing-indicator">
          <div className="typing-dot" />
          <div className="typing-dot" />
          <div className="typing-dot" />
        </div>
      </div>
    </div>
  );
}

// ===== MESSAGE BUBBLE =====
function MessageBubble({ message, index }) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === 'user';

  const copyText = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied!');
  };

  const speak = () => {
    const utterance = new SpeechSynthesisUtterance(message.content.replace(/[#*`]/g, ''));
    utterance.rate = 0.9;
    window.speechSynthesis.speak(utterance);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-end gap-3 mb-5 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      {/* Avatar */}
      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser 
          ? 'bg-gradient-to-br from-primary-500 to-accent' 
          : 'bg-gradient-to-br from-primary-600 to-accent'
      }`}>
        {isUser ? <User size={14} className="text-white" /> : <Zap size={14} className="text-white" />}
      </div>

      <div className={`group flex flex-col max-w-[80%] ${isUser ? 'items-end' : 'items-start'}`}>
        <div className={`px-5 py-3.5 rounded-2xl text-sm leading-relaxed ${
          isUser 
            ? 'bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-br-sm' 
            : 'glass-card text-slate-200 rounded-bl-sm'
        }`}
          style={!isUser ? { background: 'rgba(255,255,255,0.05)' } : {}}
        >
          {isUser ? (
            <p>{message.content}</p>
          ) : (
            <div className="prose prose-invert prose-sm max-w-none">
              <MarkdownContent content={message.content} />
            </div>
          )}
        </div>

        {/* Actions */}
        <div className={`flex items-center gap-1 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
          <span className="text-slate-600 text-xs">{message.time}</span>
          {!isUser && (
            <>
              <button onClick={copyText} className="p-1 rounded text-slate-500 hover:text-white transition-colors">
                {copied ? <span className="text-xs text-success">✓</span> : <Copy size={11} />}
              </button>
              <button onClick={speak} className="p-1 rounded text-slate-500 hover:text-white transition-colors">
                <Volume2 size={11} />
              </button>
              <button className="p-1 rounded text-slate-500 hover:text-success transition-colors">
                <ThumbsUp size={11} />
              </button>
              <button className="p-1 rounded text-slate-500 hover:text-error transition-colors">
                <ThumbsDown size={11} />
              </button>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// Simple markdown renderer
function MarkdownContent({ content }) {
  const formatted = content
    .replace(/## (.*?)(\n|$)/g, '<h3 class="text-white font-semibold text-base mt-4 mb-2">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    .replace(/✅ (.*?)(\n|$)/g, '<div class="flex gap-2 items-start mb-1"><span class="text-success text-sm">✅</span><span>$1</span></div>')
    .replace(/❌ (.*?)(\n|$)/g, '<div class="flex gap-2 items-start mb-1"><span class="text-error text-sm">❌</span><span>$1</span></div>')
    .replace(/🔷 (.*?)(\n|$)/g, '<div class="flex gap-2 items-start mb-1"><span class="text-accent text-sm">🔷</span><span>$1</span></div>')
    .replace(/\n- (.*?)(\n|$)/g, '<div class="flex gap-2 items-start mb-1"><span class="text-primary-400 mt-1">•</span><span>$1</span></div>')
    .replace(/\n(\d+)\. (.*?)(\n|$)/g, '<div class="flex gap-2 items-start mb-1"><span class="text-accent font-mono text-xs mt-0.5">$1.</span><span>$2</span></div>')
    .replace(/\n\n/g, '<div class="mb-3"></div>')
    .replace(/\n/g, '<br />');
  
  return <div dangerouslySetInnerHTML={{ __html: formatted }} />;
}

const SUGGESTED_QUESTIONS = [
  'How do I apply for a Passport?',
  'What documents are needed for Aadhaar?',
  'How do I get an Income Certificate?',
  'Can I apply for PM Kisan?',
  'How to renew Driving License?',
  'What is Ayushman Bharat scheme?',
];

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `## 🙏 Namaste! Welcome to Smart Bharat AI\n\nI'm your intelligent civic assistant. I can help you with:\n\n🔷 **Government Services** - Passport, Aadhaar, PAN, Driving License\n🔷 **Schemes & Benefits** - PM Kisan, Ayushman Bharat, scholarships\n🔷 **Documentation** - Required documents, fees, timelines\n🔷 **Civic Issues** - Report and track complaints\n\nHow can I assist you today?`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: Date.now(),
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = useCallback(async (text) => {
    const userMsg = text || input.trim();
    if (!userMsg || loading) return;

    const userMessage = {
      role: 'user',
      content: userMsg,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: Date.now(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const history = [...messages, userMessage].map(m => ({ role: m.role, content: m.content }));
      const response = await sendMessageToGemini(history);
      
      const aiMessage = {
        role: 'assistant',
        content: response,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: Date.now() + 1,
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      toast.error('Failed to get response. Please try again.');
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading]);

  const startVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Voice input not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (e) => {
      const transcript = e.results[0][0].transcript;
      setInput(transcript);
    };
    recognition.onerror = () => {
      setListening(false);
      toast.error('Voice recognition error');
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceInput = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: '## 👋 Chat cleared!\n\nHow can I help you today?',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      id: Date.now(),
    }]);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[calc(100vh-4rem)] flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-white/08 glass flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center glow-primary">
              <Zap size={18} className="text-white" />
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-success border-2 border-[#020617]" />
          </div>
          <div>
            <h1 className="font-display font-bold text-white text-base">Smart Bharat AI</h1>
            <p className="text-xs text-slate-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-success rounded-full inline-block" />
              Online · Smart Bharat Civic AI (Built-in)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={clearChat}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all"
            title="Clear chat"
          >
            <RotateCcw size={18} />
          </motion.button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-1">
        {messages.map((msg, i) => (
          <MessageBubble key={msg.id} message={msg} index={i} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length === 1 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 pb-3"
        >
          <p className="text-xs text-slate-500 mb-2 font-medium">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_QUESTIONS.map((q) => (
              <motion.button
                key={q}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => sendMessage(q)}
                className="text-xs px-3 py-2 glass rounded-xl border border-white/10 text-slate-300 hover:text-accent hover:border-accent/30 transition-all"
              >
                {q}
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Input Area */}
      <div className="px-6 py-4 border-t border-white/08 flex-shrink-0">
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder="Ask about any government service, scheme, or document..."
              rows={1}
              className="input-glass resize-none py-3 pr-4 text-sm leading-relaxed max-h-32 overflow-y-auto"
              style={{ minHeight: '48px' }}
              onInput={e => {
                e.target.style.height = 'auto';
                e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
              }}
            />
          </div>

          {/* Voice Input */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={listening ? stopVoiceInput : startVoiceInput}
            className={`p-3 rounded-xl transition-all flex-shrink-0 ${
              listening 
                ? 'bg-error text-white animate-pulse' 
                : 'text-slate-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {listening ? <MicOff size={20} /> : <Mic size={20} />}
          </motion.button>

          {/* Send Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => sendMessage()}
            disabled={!input.trim() || loading}
            className="p-3 rounded-xl bg-gradient-to-br from-primary-600 to-accent text-white disabled:opacity-40 flex-shrink-0 transition-all"
            style={{ boxShadow: input.trim() ? '0 4px 15px rgba(37,99,235,0.4)' : 'none' }}
          >
            <Send size={18} />
          </motion.button>
        </div>
        <p className="text-xs text-slate-600 mt-2 text-center">
          AI can make mistakes. Verify important information from official government websites.
        </p>
      </div>
    </motion.div>
  );
}
