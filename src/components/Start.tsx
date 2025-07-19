import React from 'react';
import { Play, Trophy } from 'lucide-react';
import { QUIZ_STAGES } from '../constants/constant';
import type { QuizStage } from '../constants/constant';

interface StartProps {
  setQuizStage: (stage: QuizStage) => void;
  userName: string;
}

const Start: React.FC<StartProps> = ({ setQuizStage, userName }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8 shadow-2xl">
          <Trophy className="w-16 h-16 text-yellow-300" />
        </div>
        
        <div className="space-y-4">
          <h1 className="text-5xl font-bold text-white mb-4">
            Hello, {userName}!
          </h1>
          <h2 className="text-3xl font-semibold text-white/90">
            Ready for the Quiz Challenge?
          </h2>
          <p className="text-xl text-white/70 max-w-md mx-auto">
            Test your knowledge with our exciting quiz questions and see how well you score!
          </p>
        </div>

        <button
          onClick={() => setQuizStage(QUIZ_STAGES.IN_PROGRESS)}
          className="bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xl font-semibold py-4 px-12 rounded-2xl hover:from-pink-600 hover:to-purple-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-3 mx-auto"
        >
          <Play className="w-6 h-6" />
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Start;