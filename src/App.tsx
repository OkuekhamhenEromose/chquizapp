import React, { useState } from 'react';
import Registration from './components/Registration';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import { QUIZ_STAGES } from './constants/constant';
import type { QuizStage } from './constants/constant';

const App: React.FC = () => {
  const [quizStage, setQuizStage] = useState<QuizStage>(QUIZ_STAGES.REGISTRATION);
  const [score, setScore] = useState(0);
  const [userName, setUserName] = useState('');

  const renderCurrentStage = () => {
    switch (quizStage) {
      case QUIZ_STAGES.REGISTRATION:
        return <Registration setQuizStage={setQuizStage} setUserName={setUserName} />;
      case QUIZ_STAGES.START:
        return <Start setQuizStage={setQuizStage} userName={userName} />;
      case QUIZ_STAGES.IN_PROGRESS:
        return (
          <Quiz
            score={score}
            setScore={setScore}
            setQuizStage={setQuizStage}
            userName={userName}
          />
        );
      case QUIZ_STAGES.ENDED:
        return (
          <Result
            score={score}
            setScore={setScore}
            setQuizStage={setQuizStage}
            userName={userName}
          />
        );
      default:
        return <Registration setQuizStage={setQuizStage} setUserName={setUserName} />;
    }
  };

  return <div className="app">{renderCurrentStage()}</div>;
};

export default App;