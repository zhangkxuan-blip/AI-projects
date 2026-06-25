import React from 'react';
import { motion } from 'framer-motion';

interface WelcomePageProps {
  onStart: () => void;
}

export const WelcomePage: React.FC<WelcomePageProps> = ({ onStart }) => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 动态迷雾背景效果 (CSS 实现简单粒子/发光) */}
      <motion.div 
        className="absolute inset-0 z-0 opacity-30"
        animate={{ 
          background: [
            'radial-gradient(circle at 30% 30%, #2f855a 0%, transparent 50%)',
            'radial-gradient(circle at 70% 70%, #6b46c1 0%, transparent 50%)',
            'radial-gradient(circle at 30% 30%, #2f855a 0%, transparent 50%)'
          ]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
      />
      
      {/* 内容区 */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-magic-green text-sm tracking-[0.3em] mb-4 font-sans"
        >
          潜意识与灵魂底色的探索之旅
        </motion.h2>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-white tracking-widest mb-16 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
        >
          心灵之旅-幻雾森林
        </motion.h1>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(107, 70, 193, 0.5)" }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="px-8 py-3 bg-transparent border border-magic-purple/50 text-gray-200 rounded text-lg tracking-widest hover:bg-magic-purple/10 transition-all duration-300 flex items-center gap-3 backdrop-blur-sm"
        >
          <span className="w-2 h-2 rounded-full bg-magic-purple animate-pulse" />
          提灯入林
        </motion.button>
      </div>
    </div>
  );
};
