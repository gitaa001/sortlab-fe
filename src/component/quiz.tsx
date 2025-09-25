"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface QuizProps {
  question: string;
  array: number[];
  correctAnswer: number[];
}

export default function Quiz({ question, array, correctAnswer }: QuizProps) {
  const [answer, setAnswer] = useState<string[]>(Array(array.length).fill(""));
  const [result, setResult] = useState<null | boolean>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const router = useRouter();

  const handleChange = (value: string, idx: number) => {
    const newAns = [...answer];
    newAns[idx] = value;
    setAnswer(newAns);
  };

  const checkAnswer = () => {
    const numericAns = answer.map(Number);
    const isCorrect = JSON.stringify(numericAns) === JSON.stringify(correctAnswer);
    
    if (isCorrect) {
      setResult(true);
      setIsCompleted(true);
    } else {
      setAttempts(prev => prev + 1);
      setResult(false);
      
      // Auto show answer after 3 wrong attempts
      if (attempts + 1 >= 3) {
        setShowAnswer(true);
        setIsCompleted(true);
      }
    }
  };

  const handleShowAnswer = () => {
    if (attempts >= 3) {
      setShowAnswer(true);
      setIsCompleted(true);
    }
  };

  const handleFinish = () => {
    router.push('/quiz/finished');
  };

  return (
    <div className="border rounded-lg p-6 bg-gray-50 shadow mb-6">
      <h3 className="text-lg font-semibold mb-3">Exercise:</h3>
      <p className="mb-3">{question}</p>
      <p className="mb-4">Array: <code>[{array.join(", ")}]</code></p>

      {/* Attempts Counter */}
      <div className="mb-4">
        <p className="text-sm text-gray-600">
          Attempts: {attempts}/3
          {attempts > 0 && attempts < 3 && (
            <span className="text-orange-600 ml-2">
              ({3 - attempts} attempts remaining)
            </span>
          )}
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        {answer.map((val, idx) => (
          <input
            key={idx}
            type="text"
            value={val}
            onChange={(e) => handleChange(e.target.value, idx)}
            className="w-12 h-12 border rounded text-center text-lg"
            disabled={isCompleted}
          />
        ))}
      </div>

      <div className="flex gap-3">
        {!isCompleted && (
          <button
            onClick={checkAnswer}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Submit Answer
          </button>
        )}
        
        <button
          onClick={handleShowAnswer}
          className={`px-4 py-2 rounded ${
            attempts >= 3 
              ? 'bg-blue-500 hover:bg-blue-600 text-white' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={attempts < 3}
          title={attempts < 3 ? "Available after 3 wrong attempts" : "Show correct answer"}
        >
          Show Answer
        </button>

      </div>

      {/* Warning Messages */}
      {attempts === 1 && result === false && (
        <div className="mt-4 text-yellow-600 font-semibold">
          ⚠️ Wrong answer! 2 attempts remaining.
        </div>
      )}
      
      {attempts === 2 && result === false && (
        <div className="mt-4 text-orange-600 font-semibold">
          ⚠️ Wrong answer! 1 attempt remaining. Be careful!
        </div>
      )}

      {attempts >= 3 && result === false && !showAnswer && (
        <div className="mt-4 text-red-600 font-semibold">
          ❌ No more attempts! You can now view the answer.
        </div>
      )}

      {/* Results */}
      {result !== null && !showAnswer && (
        <div className="mt-4">
          {result ? (
            <p className="text-green-600 font-semibold">✅ Correct! Well done!</p>
          ) : (
            <p className="text-red-600 font-semibold">❌ Wrong, try again.</p>
          )}
        </div>
      )}

      {showAnswer && (
        <div className="mt-4 text-blue-600 font-semibold">
          ✅ Correct Answer: [{correctAnswer.join(", ")}]
        </div>
      )}
    </div>
  );
}