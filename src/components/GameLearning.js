import React, { useState, useEffect } from 'react';
import './GameLearning.css';

const GameLearning = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [streak, setStreak] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answerStatus, setAnswerStatus] = useState(null);

  // Sample questions (In production, these would come from Gemini API)
  const sampleQuestions = [
    {
      question: "What is the primary cause of water wastage in most households?",
      options: [
        "Leaky faucets and pipes",
        "Long showers",
        "Washing machines",
        "Dishwashers"
      ],
      correctAnswer: 0,
      explanation: "Leaky faucets and pipes are often overlooked but can waste thousands of gallons annually."
    },
    {
      question: "How much water can a dripping faucet waste in a day?",
      options: [
        "1-2 liters",
        "5-10 liters",
        "20-30 liters",
        "40-50 liters"
      ],
      correctAnswer: 2,
      explanation: "A single dripping faucet can waste between 20-30 liters of water per day."
    },
    {
      question: "Which water conservation method is most effective in gardens?",
      options: [
        "Watering at noon",
        "Drip irrigation",
        "Sprinklers",
        "Manual watering"
      ],
      correctAnswer: 1,
      explanation: "Drip irrigation is the most efficient method, delivering water directly to plant roots with minimal evaporation."
    }
  ];

  useEffect(() => {
    // Simulate API call to Gemini
    setTimeout(() => {
      setQuestions(sampleQuestions);
      setLoading(false);
    }, 1500);
  }, []);

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswer !== null) return; // Prevent multiple answers

    setSelectedAnswer(answerIndex);
    const correct = answerIndex === questions[currentQuestion].correctAnswer;
    setAnswerStatus(correct);

    if (correct) {
      setStreak(prev => prev + 1);
      setScore(prev => prev + 100 * (streak + 1));
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
        setSelectedAnswer(null);
        setAnswerStatus(null);
      } else {
        setShowScore(true);
      }
    }, 2000);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setStreak(0);
    setSelectedAnswer(null);
    setAnswerStatus(null);
  };

  if (loading) {
    return (
      <div className="game-container">
        <div className="loading-screen">
          <div className="water-drop"></div>
          <p>Loading Questions...</p>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="game-container">
        <div className="score-screen">
          <h2>Game Complete! 🎉</h2>
          <div className="final-score">
            <span>Your Score:</span>
            <span className="score-value">{score}</span>
          </div>
          <p className="score-message">
            {score > 500 ? "Amazing! You're a water conservation expert! 🌟" :
             score > 300 ? "Great job! Keep learning! 👍" :
             "Good effort! Try again to improve! 💪"}
          </p>
          <button className="restart-btn" onClick={restartGame}>
            Play Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="game-container">
      <div className="game-header">
        <div className="progress-bar">
          <div 
            className="progress" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="game-stats">
          <span className="question-counter">
            Question {currentQuestion + 1}/{questions.length}
          </span>
          <span className="score-display">
            Score: {score}
          </span>
          <span className="streak-display">
            Streak: {streak} 🔥
          </span>
        </div>
      </div>

      <div className="question-section">
        <h2>{questions[currentQuestion].question}</h2>
        
        <div className="options-grid">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option-btn ${
                selectedAnswer === index 
                  ? answerStatus 
                    ? 'correct' 
                    : 'incorrect'
                  : ''
              }`}
              onClick={() => handleAnswerClick(index)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer !== null && (
          <div className={`explanation ${answerStatus ? 'correct' : 'incorrect'}`}>
            <p>
              {answerStatus ? '✅ Correct!' : '❌ Incorrect!'}
              <br />
              {questions[currentQuestion].explanation}
            </p>
          </div>
        )}
      </div>

      <div className="game-footer">
        <p className="tip">
          💡 Tip: Build your streak to earn bonus points!
        </p>
      </div>
    </div>
  );
};

export default GameLearning;
