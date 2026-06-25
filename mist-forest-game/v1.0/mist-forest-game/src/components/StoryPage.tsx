import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import questionsData from '../data/questions.json';

interface StoryPageProps {
  currentIndex: number;
  onAnswer: (scores: any) => void;
  onFinish: () => void;
}

export const StoryPage: React.FC<StoryPageProps> = ({ currentIndex, onAnswer, onFinish }) => {
  const isFinished = currentIndex >= questionsData.length;
  const currentQuestion = isFinished ? null : questionsData[currentIndex];
  
  // 用于打字机效果的状态
  const [displayedText, setDisplayedText] = useState('');
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (!currentQuestion) {
      if (isFinished) onFinish();
      return;
    }

    // 重置状态
    setDisplayedText('');
    setShowOptions(false);

    // 简易打字机效果
    let i = 0;
    const text = currentQuestion.question;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(() => setShowOptions(true), 500); // 文字打完后稍微停顿显示选项
      }
    }, 40); // 打字速度

    return () => clearInterval(interval);
  }, [currentIndex, currentQuestion, isFinished, onFinish]);

  if (!currentQuestion) return null;

  // 计算顶部月相/进度
  const progress = (currentIndex / questionsData.length) * 100;

  return (
    <div className="w-full h-screen flex flex-col items-center px-4 py-8 max-w-2xl mx-auto">
      {/* 顶部进度条 (月相/光线渐变感) */}
      <div className="w-full h-1 bg-forest-light rounded-full overflow-hidden mb-12 opacity-50">
        <motion.div 
          className="h-full bg-magic-purple"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* 章节提示 */}
      <motion.div 
        key={`chapter-${currentQuestion.chapter}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xs text-gray-500 tracking-widest mb-8 font-sans"
      >
        — {currentQuestion.chapter} —
      </motion.div>

      {/* 题目文字区 */}
      <div className="flex-1 w-full flex flex-col justify-start mt-10">
        <div className="min-h-[150px]">
          <p className="text-xl md:text-2xl leading-relaxed text-gray-200 font-serif drop-shadow-md">
            {displayedText}
            {!showOptions && <span className="animate-pulse ml-1 opacity-50">_</span>}
          </p>
        </div>

        {/* 选项区 */}
        <AnimatePresence>
          {showOptions && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full mt-auto mb-12 space-y-4"
            >
              {currentQuestion.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.05)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onAnswer(option.scores)}
                  className="w-full text-left p-4 md:p-5 rounded-lg border border-gray-700/50 bg-forest-light/30 backdrop-blur-sm hover:border-magic-purple/50 transition-colors duration-300 text-gray-300 leading-relaxed font-sans shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
                >
                  {option.text}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
