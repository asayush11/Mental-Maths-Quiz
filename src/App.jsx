import React, { useState } from 'react';
import Home from './components/Home';
import Quiz from './components/Quiz';
import Result from './components/Result';

function App() {
  const [screen, setScreen] = useState('home');
  const [score, setScore] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);

  const generateQuestions = () => {
    const operations = ['+', '-', '*', '/'];
    const generated = [];
    for (let i = 0; i < 20; i++) {
      const num1 = Math.floor(Math.random() * 100) + 1;
      const num2 = Math.floor(Math.random() * 99) + 1;
      const num3 = Math.floor(Math.random() * 100) + 1;
      const num4 = Math.floor(Math.random() * 99) + 1;
      const op1 = operations[Math.floor(Math.random() * operations.length)];
      const op2 = operations[Math.floor(Math.random() * operations.length)];
      const op3 = operations[Math.floor(Math.random() * operations.length)];

      const nums = [num1, num2, num3, num4];
      const ops = [op1, op2, op3];

      for (let i = 0; i < ops.length; i++) {
        if (ops[i] === '*' || ops[i] === '/') {
           const result = ops[i] === '*'
            ? nums[i] * nums[i + 1]
            : parseFloat(( nums[i] / nums[i + 1]).toFixed(2));
            nums.splice(i, 2, result); 
            ops.splice(i, 1);          
            i--; 
        } 
      }

  
    let correct = parseFloat((nums[0]).toFixed(2));
       for (let i = 0; i < ops.length; i++) {
       correct = ops[i] === '+'
      ? correct + parseFloat((nums[i + 1]).toFixed(2))
      : correct - parseFloat((nums[i + 1]).toFixed(2));
      }
      correct = parseFloat((correct).toFixed(2));
      const options = [correct];
      while (options.length < 4) {
        const wrong = correct + (Math.random() * 20 - 10);
        const rounded = parseFloat(wrong.toFixed(2));
        if (!options.includes(rounded)) options.push(rounded);
      }
      generated.push({ num1, num2, num3, num4, op1, op2, op3, correct, options: shuffle(options) });
    }
    return generated;
  };

  const shuffle = (array) => array.sort(() => 0.5 - Math.random());

  const startQuiz = () => {
    setQuestions(generateQuestions());
    setAnswers([]);
    setScore(0);
    setScreen('quiz');
  };

  const finishQuiz = (finalScore, answerList) => {
    setScore(finalScore);
    setAnswers(answerList);
    setScreen('result');
  };

  const goHome = () => {
    setScreen('home');
    setScore(0);
    setQuestions([]);
    setAnswers([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 text-center p-6">
      {screen === 'home' && <Home startQuiz={startQuiz} />}
      {screen === 'quiz' && <Quiz questions={questions} finishQuiz={finishQuiz} goHome={goHome} />}
      {screen === 'result' && <Result score={score} answers={answers} goHome={goHome} />}
    </div>
  );
}

export default App;