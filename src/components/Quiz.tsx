import React, { useState } from 'react';
import { ArrowRight, Clock, AlertCircle } from 'lucide-react';
import Option from './Option';
import QUESTIONS from '../data/questions';
import { QUIZ_STAGES } from '../constants/constant';
import type { QuizStage } from '../constants/constant';
import { useEffect } from 'react';

interface QuizProps {
  score: number;
  setScore: (score: number) => void;
  setQuizStage: (stage: QuizStage) => void;
  userName: string;
}

const Quiz: React.FC<QuizProps> = ({ score, setScore, setQuizStage, userName }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isTimeUp, setIsTimeUp] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setIsTimeUp(true);
      
      // Auto-advance to next question after a brief delay
      setTimeout(() => {
        if (currentQuestion === QUESTIONS.length - 1) {
          setQuizStage(QUIZ_STAGES.ENDED);
        } else {
          setCurrentQuestion(currentQuestion + 1);
          setSelectedOption(null);
          setShowResult(false);
          setIsTimeUp(false);
          setTimeLeft(30);
        }
      }, 1500); // 1.5 second delay to show "Time's up!" message
    }
  }, [timeLeft, showResult, currentQuestion, setQuizStage]);

  useEffect(() => {
    setTimeLeft(30);
    setIsTimeUp(false);
  }, [currentQuestion]);

  const onNextClick = () => {
    if (!selectedOption) return;

    if (!showResult) {
      setShowResult(true);
      if (selectedOption === QUESTIONS[currentQuestion].correctOption) {
        setScore(score + 1);
      }
      return;
    }

    if (currentQuestion === QUESTIONS.length - 1) {
      setQuizStage(QUIZ_STAGES.ENDED);
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
    setSelectedOption(null);
    setShowResult(false);
  };

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const timeProgress = (timeLeft / 30) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              <span className="font-medium">Quiz in Progress</span>
            </div>
            <span className="text-purple-200">Hi, {userName}!</span>
          </div>
          
          {/* Timer */}
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm mb-2">
              <span>Time Remaining</span>
              <span className={`font-bold ${timeLeft <= 10 ? 'text-red-300' : 'text-white'}`}>
                {timeLeft}s
              </span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className={`rounded-full h-2 transition-all duration-1000 ${
                  timeLeft <= 10 ? 'bg-red-400' : 'bg-green-400'
                }`}
                style={{ width: `${timeProgress}%` }}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Question {currentQuestion + 1} of {QUESTIONS.length}</span>
              <span>Score: {score}/{QUESTIONS.length}</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div 
                className="bg-white rounded-full h-2 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Question */}
        <div className="p-4">
          {isTimeUp && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-2 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <span className="text-red-700 text-sm font-medium">Time's up!</span>
            </div>
          )}
          
          <h2 className="text-lg font-bold text-gray-800 mb-4 leading-relaxed">
            {QUESTIONS[currentQuestion].question}
          </h2>

          {/* Options */}
          <div className="space-y-2 mb-4">
            {QUESTIONS[currentQuestion].options.map((option) => (
              <Option
                key={option}
                data={option}
                correctOption={QUESTIONS[currentQuestion].correctOption}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                showResult={showResult}
              />
            ))}
          </div>

          {/* Next Button */}
          <div className="flex justify-end">
            <button
              onClick={onNextClick}
              disabled={!selectedOption && !isTimeUp}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-semibold hover:from-purple-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl text-sm"
            >
              {showResult || isTimeUp ? (
                currentQuestion === QUESTIONS.length - 1 ? 'Finish Quiz' : 'Next Question'
              ) : 'Submit Answer'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Quiz;