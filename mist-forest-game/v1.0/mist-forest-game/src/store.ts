import { useState, useCallback } from 'react';

export type DimensionScores = {
  O: number; // 开放性
  C: number; // 尽责性
  E: number; // 外向性
  A: number; // 宜人性
  N: number; // 神经质
  StressSurvival: number; // 生存压力
  StressSocial: number;   // 社交压力
  StressSelf: number;     // 自我压力
  StressLevel: number;    // 总体压力状态
};

const initialScores: DimensionScores = {
  O: 0, C: 0, E: 0, A: 0, N: 0,
  StressSurvival: 0, StressSocial: 0, StressSelf: 0, StressLevel: 0
};

export function useGameStore() {
  const [currentStep, setCurrentStep] = useState<'welcome' | 'story' | 'loading' | 'result'>('welcome');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState<DimensionScores>(initialScores);

  const startGame = useCallback(() => {
    setCurrentStep('story');
    setCurrentQuestionIndex(0);
    setScores(initialScores);
  }, []);

  const answerQuestion = useCallback((scoreChanges: Partial<DimensionScores>) => {
    setScores(prev => {
      const newScores = { ...prev };
      // 累加各个维度的分数
      (Object.keys(scoreChanges) as Array<keyof DimensionScores>).forEach(key => {
        if (scoreChanges[key] !== undefined) {
          newScores[key] += scoreChanges[key]!;
        }
      });
      return newScores;
    });

    setCurrentQuestionIndex(prev => prev + 1);
  }, []);

  const finishStory = useCallback(() => {
    setCurrentStep('loading');
    // 模拟结算加载动画
    setTimeout(() => {
      setCurrentStep('result');
    }, 2500);
  }, []);

  return {
    currentStep,
    currentQuestionIndex,
    scores,
    startGame,
    answerQuestion,
    finishStory
  };
}
