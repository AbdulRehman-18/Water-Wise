import React, { useState, useEffect } from 'react';
import { generateMultipleQuestions } from '../../services/geminiService';
import './WaterQuiz.css';

// Fallback questions in case API fails
const fallbackQuestions = [
  {
    question: "How much of Earth's water is freshwater?",
    options: ["3%", "25%", "50%", "75%"],
    correct: 0,
    explanation: "Only about 3% of Earth's water is freshwater, and most of it is frozen in glaciers and ice caps."
  },
  {
    question: "What is the primary source of freshwater on Earth?",
    options: ["Rivers", "Lakes", "Groundwater", "Atmosphere"],
    correct: 2,
    explanation: "Groundwater is the primary source of freshwater on Earth, accounting for about 30% of the planet's freshwater."
  },
  {
    question: "How much water does it take to produce 1 pound of beef?",
    options: ["100 gallons", "500 gallons", "1000 gallons", "2000 gallons"],
    correct: 3,
    explanation: "It takes approximately 2000 gallons of water to produce 1 pound of beef, making it one of the most water-intensive foods to produce."
  },
  {
    question: "What percentage of the world's water is used for agriculture?",
    options: ["50%", "60%", "70%", "80%"],
    correct: 3,
    explanation: "About 80% of the world's water is used for agriculture, making it the largest user of freshwater resources."
  },
  {
    question: "What is the name of the process by which water moves through a plant, from the roots to the leaves, and is then released into the air as water vapor?",
    options: ["Respiration", "Photosynthesis", "Transpiration", "Evaporation"],
    correct: 2,
    explanation: "Transpiration is the process by which water moves through a plant, from the roots to the leaves, and is then released into the air as water vapor."
  }
];

const WaterQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [streak, setStreak] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showExplanation, setShowExplanation] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const generatedQuestions = await generateMultipleQuestions(5);
      setQuestions(generatedQuestions);
      setCurrentQuestion(0);
    } catch (err) {
      console.error('Error loading questions:', err);
      if (retryCount < 2) {
        // Retry up to 2 times
        setRetryCount(prev => prev + 1);
        setTimeout(loadQuestions, 1000); // Wait 1 second before retrying
      } else {
        setError('Unable to generate questions. Using default questions instead.');
        setQuestions(fallbackQuestions);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleAnswerClick = (answerIndex) => {
    if (selectedAnswer !== null || !questions[currentQuestion]) return;
    
    setSelectedAnswer(answerIndex);
    setShowExplanation(true);

    if (answerIndex === questions[currentQuestion].correct) {
      const newStreak = streak + 1;
      setStreak(newStreak);
      setScore(score + (100 * (1 + Math.floor(newStreak / 3))));
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setShowExplanation(false);
      setSelectedAnswer(null);
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setShowScore(true);
      }
    }, 3000); // Show explanation for 3 seconds
  };

  const restartQuiz = () => {
    setScore(0);
    setShowScore(false);
    setStreak(0);
    setCurrentQuestion(0);
    setRetryCount(0);
    loadQuestions();
  };

  if (isLoading) {
    return (
      <div className="quiz-container loading">
        <div className="loading-animation">
          <div className="water-drop">💧</div>
          <p>Loading Quiz Questions...</p>
        </div>
      </div>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="error-section">
          <h2>Unable to Load Questions</h2>
          <p>{error || 'Please try again later.'}</p>
          <button className="restart-button" onClick={restartQuiz}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (showScore) {
    return (
      <div className="quiz-container">
        <div className="score-section">
          <h2>Quiz Complete! 🎉</h2>
          <p className="final-score">Your Score: {score}</p>
          <p className="score-message">
            {score > 500 ? "Amazing! You're a water conservation expert! 🌟" :
             score > 300 ? "Great job! Keep learning! 👏" :
             "Good effort! Try again to improve your score! 💪"}
          </p>
          <button className="restart-button" onClick={restartQuiz}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="progress-bar">
          <div 
            className="progress"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="quiz-stats">
          <span className="question-counter">
            Question {currentQuestion + 1}/{questions.length}
          </span>
          <span className="score">Score: {score}</span>
          {streak > 2 && (
            <span className="streak">
              🔥 {streak} Streak! (x{1 + Math.floor(streak / 3)})
            </span>
          )}
        </div>
      </div>

      <div className="question-section">
        <h2>{questions[currentQuestion].question}</h2>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              className={`option ${
                showExplanation
                  ? index === questions[currentQuestion].correct
                    ? "correct"
                    : index === selectedAnswer
                    ? "wrong"
                    : ""
                  : ""
              }`}
              onClick={() => handleAnswerClick(index)}
              disabled={showExplanation}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      {showExplanation && (
        <div className="explanation">
          <p>{questions[currentQuestion].explanation}</p>
        </div>
      )}
    </div>
  );
};

export default WaterQuiz;
