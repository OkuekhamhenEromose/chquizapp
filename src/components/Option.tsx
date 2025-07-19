import React from 'react';
import { Check, X } from 'lucide-react';

interface OptionProps {
  data: string;
  correctOption: string;
  selectedOption: string | null;
  setSelectedOption: (option: string) => void;
  showResult: boolean;
}

const Option: React.FC<OptionProps> = ({ 
  data, 
  correctOption, 
  selectedOption, 
  setSelectedOption,
  showResult 
}) => {
  const isSelected = selectedOption === data;
  const isCorrect = data === correctOption;
  const isIncorrect = isSelected && !isCorrect && showResult;

  const getOptionStyles = () => {
    if (showResult) {
      if (isCorrect) {
        return 'bg-green-100 border-green-500 text-green-800';
      }
      if (isIncorrect) {
        return 'bg-red-100 border-red-500 text-red-800';
      }
    }
    
    if (isSelected) {
      return 'bg-purple-100 border-purple-500 text-purple-800';
    }
    
    return 'bg-gray-50 border-gray-300 text-gray-700 hover:bg-gray-100';
  };

  return (
    <button
      onClick={() => !showResult && setSelectedOption(data)}
      disabled={showResult}
      className={`w-full p-2 text-left border-2 rounded-lg transition-all duration-200 flex items-center justify-between text-sm ${getOptionStyles()}`}
    >
      <span className="font-medium">{data}</span>
      {showResult && isCorrect && <Check className="w-5 h-5 text-green-600" />}
      {showResult && isIncorrect && <X className="w-5 h-5 text-red-600" />}
    </button>
  );
};

export default Option;