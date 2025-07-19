import React from 'react';
import { RotateCcw, Trophy, Medal, Award } from 'lucide-react';
import { QUIZ_STAGES } from '../constants/constant';
import type { QuizStage } from '../constants/constant';
import QUESTIONS from '../data/questions';

interface ResultProps {
  score: number;
  setScore: (score: number) => void;
  setQuizStage: (stage: QuizStage) => void;
  userName: string;
}

const Result: React.FC<ResultProps> = ({ score, setScore, setQuizStage, userName }) => {
  const percentage = Math.round((score / QUESTIONS.length) * 100);
  
  const getPerformanceData = () => {
    if (percentage >= 90) {
      return {
        icon: Trophy,
        title: "Outstanding!",
        message: "You're a quiz master!",
        color: "from-yellow-400 to-orange-500",
        bgColor: "from-yellow-50 to-orange-50"
      };
    } else if (percentage >= 70) {
      return {
        icon: Medal,
        title: "Great Job!",
        message: "Excellent performance!",
        color: "from-green-400 to-emerald-500",
        bgColor: "from-green-50 to-emerald-50"
      };
    } else if (percentage >= 50) {
      return {
        icon: Award,
        title: "Good Work!",
        message: "Keep practicing!",
        color: "from-blue-400 to-indigo-500",
        bgColor: "from-blue-50 to-indigo-50"
      };
    } else {
      return {
        icon: Award,
        title: "Keep Learning!",
        message: "Practice makes perfect!",
        color: "from-purple-400 to-pink-500",
        bgColor: "from-purple-50 to-pink-50"
      };
    }
  };

  const performance = getPerformanceData();
  const IconComponent = performance.icon;

  const onRestart = () => {
    setScore(0);
    setQuizStage(QUIZ_STAGES.IN_PROGRESS);
  };

  const onNewQuiz = () => {
    setScore(0);
    setQuizStage(QUIZ_STAGES.REGISTRATION);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className={`bg-gradient-to-br ${performance.bgColor} rounded-3xl shadow-2xl w-full max-w-md overflow-hidden`}>
        
        {/* Header */}
        <div className={`bg-gradient-to-r ${performance.color} text-white p-6 text-center`}>
          <div className="bg-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <IconComponent className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold mb-2">{performance.title}</h1>
          <p className="text-white/90">{performance.message}</p>
        </div>

        {/* Results */}
        <div className="p-6 text-center space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Well done, {userName}!
            </h2>
            <p className="text-gray-600">Here are your quiz results:</p>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {score}/{QUESTIONS.length}
              </div>
              <div className="text-sm text-gray-600">Correct Answers</div>
            </div>

            <div className="bg-white rounded-2xl p-4 shadow-lg">
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {percentage}%
              </div>
              <div className="text-sm text-gray-600">Score Percentage</div>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <button
              onClick={onRestart}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 px-6 rounded-2xl font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <RotateCcw className="w-5 h-5" />
              Try Again
            </button>

            <button
              onClick={onNewQuiz}
              className="w-full bg-white text-gray-700 py-3 px-6 rounded-2xl font-semibold hover:bg-gray-50 transition-all duration-200 border-2 border-gray-200 hover:border-gray-300"
            >
              New User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;