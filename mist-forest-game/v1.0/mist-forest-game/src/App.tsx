import React from 'react';
import { useGameStore } from './store';
import { WelcomePage } from './components/WelcomePage';
import { StoryPage } from './components/StoryPage';
import { LoadingPage } from './components/LoadingPage';
import { ResultPage } from './components/ResultPage';

function App() {
  const { 
    currentStep, 
    currentQuestionIndex, 
    scores, 
    startGame, 
    answerQuestion, 
    finishStory 
  } = useGameStore();

  return (
    <div className="min-h-screen bg-forest-dark font-sans selection:bg-magic-purple/30 text-gray-200">
      {currentStep === 'welcome' && <WelcomePage onStart={startGame} />}
      {currentStep === 'story' && (
        <StoryPage 
          currentIndex={currentQuestionIndex} 
          onAnswer={answerQuestion} 
          onFinish={finishStory} 
        />
      )}
      {currentStep === 'loading' && <LoadingPage />}
      {currentStep === 'result' && (
        <ResultPage 
          scores={scores} 
          onRestart={() => window.location.reload()} 
        />
      )}
    </div>
  );
}

export default App;
