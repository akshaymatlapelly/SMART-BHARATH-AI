import React from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#040916]">
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-600 to-accent flex items-center justify-center glow-primary"
        >
          <Zap size={28} className="text-white" />
        </motion.div>
        
        <div className="text-center">
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-slate-400 text-sm"
          >
            Loading Smart Bharat AI...
          </motion.p>
        </div>

        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
              className="w-2 h-2 rounded-full bg-accent"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
