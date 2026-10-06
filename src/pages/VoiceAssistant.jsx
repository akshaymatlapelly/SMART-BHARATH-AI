import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Globe, Zap, Play, Square } from 'lucide-react';
import toast from 'react-hot-toast';
import { sendMessageToGemini } from '../services/geminiService';

const LANGUAGES = [
  { code: 'en-IN', name: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'hi-IN', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
  { code: 'te-IN', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
  { code: 'ta-IN', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
  { code: 'kn-IN', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
];

const SAMPLE_QUESTIONS = [
  'How to apply for passport?',
  'What documents are needed for Aadhaar?',
  'Tell me about PM Kisan scheme',
  'How to pay property tax online?',
];

export default function VoiceAssistant() {
  const [listening, setListening] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [language, setLanguage] = useState('en-IN');
  const [processing, setProcessing] = useState(false);
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      toast.error('Voice recognition not supported in this browser. Try Chrome.');
      return;
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = async (e) => {
      const text = Array.from(e.results).map(r => r[0].transcript).join('');
      setTranscript(text);
      if (e.results[e.results.length - 1].isFinal) {
        await processQuery(text);
      }
    };
    recognition.onerror = () => {
      setListening(false);
      toast.error('Voice recognition error. Please try again.');
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopListening = () => {
    recognitionRef.current?.stop();
    setListening(false);
  };

  const processQuery = async (text) => {
    setProcessing(true);
    try {
      const reply = await sendMessageToGemini([{ role: 'user', content: text }]);
      const cleanReply = reply.replace(/#{1,3} /g, '').replace(/\*\*/g, '').replace(/\*/g, '');
      setResponse(cleanReply);
      speak(cleanReply);
    } catch {
      toast.error('Failed to process query');
    } finally {
      setProcessing(false);
    }
  };

  const speak = (text) => {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.substring(0, 500));
    utterance.lang = language;
    utterance.rate = 0.85;
    utterance.onstart = () => setSpeaking(true);
    utterance.onend = () => setSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setSpeaking(false);
  };

  const askSample = (q) => {
    setTranscript(q);
    processQuery(q);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-6 max-w-2xl mx-auto min-h-full"
    >
      <div className="mb-8 text-center">
        <span className="badge badge-primary mb-3">Multilingual</span>
        <h1 className="font-display font-bold text-3xl text-white mb-2">
          Voice <span className="gradient-text">Assistant</span>
        </h1>
        <p className="text-slate-400">Speak in your language and get instant AI responses</p>
      </div>

      {/* Language Selector */}
      <div className="glass-card p-4 mb-6">
        <p className="text-sm text-slate-400 mb-3 flex items-center gap-2"><Globe size={14} /> Select Language</p>
        <div className="flex flex-wrap gap-2">
          {LANGUAGES.map(lang => (
            <motion.button
              key={lang.code}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLanguage(lang.code)}
              className={`flex items-center gap-2 px-3 py-2 rounded-xl text-sm transition-all ${
                language === lang.code
                  ? 'bg-primary-600 text-white'
                  : 'glass border border-white/10 text-slate-400 hover:text-white'
              }`}
            >
              <span>{lang.flag}</span>
              <span>{lang.native}</span>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Main Mic Button */}
      <div className="text-center mb-8">
        <div className="relative inline-block">
          {/* Pulse rings when listening */}
          {listening && (
            <>
              <div className="absolute inset-0 rounded-full bg-error/20 animate-ping" />
              <div className="absolute inset-0 rounded-full bg-error/10 animate-ping" style={{ animationDelay: '0.5s' }} />
            </>
          )}
          {speaking && (
            <>
              <div className="absolute inset-0 rounded-full bg-accent/20 animate-ping" />
            </>
          )}
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={listening ? stopListening : startListening}
            disabled={processing}
            className="relative w-28 h-28 rounded-full text-white flex items-center justify-center disabled:opacity-50"
            style={{
              background: listening 
                ? 'linear-gradient(135deg, #EF4444, #DC2626)'
                : speaking
                ? 'linear-gradient(135deg, #38BDF8, #0284C7)'
                : 'linear-gradient(135deg, #2563EB, #1d4ed8)',
              boxShadow: listening 
                ? '0 0 40px rgba(239,68,68,0.5)' 
                : '0 0 40px rgba(37,99,235,0.5)'
            }}
          >
            {listening ? <MicOff size={36} /> : <Mic size={36} />}
          </motion.button>
        </div>

        <p className="text-slate-400 text-sm mt-4">
          {listening ? '🎙️ Listening... speak now' 
            : speaking ? '🔊 Speaking...' 
            : processing ? '⚙️ Processing...'
            : 'Tap to speak'}
        </p>

        {speaking && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={stopSpeaking}
            className="mt-2 text-xs text-error hover:underline"
          >
            Stop speaking
          </motion.button>
        )}
      </div>

      {/* Transcript */}
      <AnimatePresence>
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-4 mb-4"
          >
            <p className="text-xs text-slate-500 mb-1">Your question:</p>
            <p className="text-white font-medium">"{transcript}"</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Processing */}
      {processing && (
        <div className="glass-card p-6 text-center mb-4">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className="w-8 h-8 border-2 border-primary-500/30 border-t-primary-500 rounded-full mx-auto mb-2"
          />
          <p className="text-slate-400 text-sm">Processing your question...</p>
        </div>
      )}

      {/* Response */}
      <AnimatePresence>
        {response && !processing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-5 mb-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-accent" />
                <span className="text-sm font-medium text-accent">AI Response</span>
              </div>
              <button
                onClick={() => speak(response)}
                className="p-1.5 rounded-lg glass border border-white/10 text-slate-400 hover:text-white transition-all"
              >
                <Volume2 size={14} />
              </button>
            </div>
            <p className="text-slate-300 text-sm leading-relaxed">
              {response.substring(0, 600)}{response.length > 600 ? '...' : ''}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sample Questions */}
      <div className="glass-card p-4">
        <p className="text-sm text-slate-400 mb-3 flex items-center gap-2">
          <Play size={12} /> Try saying:
        </p>
        <div className="space-y-2">
          {SAMPLE_QUESTIONS.map((q, i) => (
            <motion.button
              key={q}
              whileHover={{ x: 4 }}
              onClick={() => askSample(q)}
              className="w-full text-left text-sm text-slate-300 hover:text-white py-2 px-3 rounded-lg hover:bg-white/05 transition-all flex items-center gap-2"
            >
              <span className="text-accent text-xs">▶</span>
              "{q}"
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
