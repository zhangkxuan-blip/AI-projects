import React from 'react';
import { motion } from 'framer-motion';

export const LoadingPage: React.FC = () => {
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-16 h-16 rounded-full border-t-2 border-r-2 border-magic-purple animate-spin mb-8"
      />
      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-gray-400 tracking-widest font-serif"
      >
        泉水正在倒映你的灵魂...
      </motion.p>
    </div>
  );
};
