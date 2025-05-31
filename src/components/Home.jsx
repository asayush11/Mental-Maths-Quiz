import React from 'react';

export default function Home({ startQuiz }) {
  return (
    <div className="max-w-xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-4xl font-bold mb-6">Maths Quiz</h1>
      <p className="mb-4">You will be asked 20 basic math questions.</p>
      <p className="mb-4">Each question has a 30 second timer and 4 answer choices.</p>
      <p className="mb-4">You get +1 point for a correct answer and -0.5 for an incorrect one.</p>
      <button onClick={startQuiz} className="mt-6 px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">Start</button>
    </div>
  );
}