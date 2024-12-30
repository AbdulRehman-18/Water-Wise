import React, { useState, useEffect, useRef } from 'react';
import './WaterDropGame.css';

const WaterDropGame = () => {
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [drops, setDrops] = useState([]);
  const [bucketPosition, setBucketPosition] = useState(50);
  const gameAreaRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem('waterDropGameHighScore')) || 0
  );

  useEffect(() => {
    if (gameStarted && !gameOver) {
      const interval = setInterval(createDrop, 1000);
      const gameLoop = requestAnimationFrame(updateGame);

      return () => {
        clearInterval(interval);
        cancelAnimationFrame(gameLoop);
      };
    }
  }, [gameStarted, gameOver]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameOver) return;

      if (e.key === 'ArrowLeft') {
        moveBucket('left');
      } else if (e.key === 'ArrowRight') {
        moveBucket('right');
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [gameStarted, gameOver]);

  const createDrop = () => {
    const newDrop = {
      id: Date.now(),
      x: Math.random() * 90 + 5,
      y: 0,
      speed: Math.random() * 2 + 3,
    };

    setDrops(currentDrops => [...currentDrops, newDrop]);
  };

  const updateGame = () => {
    if (gameOver) return;

    setDrops(currentDrops => {
      return currentDrops.map(drop => {
        const newY = drop.y + drop.speed;

        if (newY >= 85 && newY <= 95) {
          const bucketLeft = bucketPosition - 5;
          const bucketRight = bucketPosition + 5;

          if (drop.x >= bucketLeft && drop.x <= bucketRight) {
            setScore(current => {
              const newScore = current + 1;
              if (newScore > highScore) {
                setHighScore(newScore);
                localStorage.setItem('waterDropGameHighScore', newScore.toString());
              }
              return newScore;
            });
            return null;
          }
        }

        if (newY > 100) {
          setGameOver(true);
          return null;
        }

        return { ...drop, y: newY };
      }).filter(Boolean);
    });

    requestAnimationFrame(updateGame);
  };

  const moveBucket = (direction) => {
    setBucketPosition(current => {
      if (direction === 'left') {
        return Math.max(5, current - 5);
      }
      return Math.min(95, current + 5);
    });
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setDrops([]);
    setBucketPosition(50);
  };

  return (
    <div className="water-drop-game">
      <div className="game-header">
        <div className="score-container">
          <div className="current-score">Score: {score}</div>
          <div className="high-score">High Score: {highScore}</div>
        </div>
      </div>

      <div className="game-area" ref={gameAreaRef}>
        {!gameStarted ? (
          <div className="start-screen">
            <h2>Water Drop Catcher</h2>
            <p>Catch the falling water drops to save water!</p>
            <p>Use left and right arrow keys to move the bucket</p>
            <button className="start-button" onClick={startGame}>
              Start Game
            </button>
          </div>
        ) : (
          <>
            {drops.map(drop => (
              <div
                key={drop.id}
                className="water-drop"
                style={{
                  left: `${drop.x}%`,
                  top: `${drop.y}%`
                }}
              />
            ))}

            <div
              className="bucket"
              style={{ left: `${bucketPosition}%` }}
            />
          </>
        )}

        {gameOver && (
          <div className="game-over">
            <h2>Game Over!</h2>
            <p>Final Score: {score}</p>
            <p>High Score: {highScore}</p>
            <button className="restart-button" onClick={startGame}>
              Play Again
            </button>
          </div>
        )}
      </div>

      {gameStarted && !gameOver && (
        <div className="game-controls">
          <button
            className="control-button"
            onMouseDown={() => moveBucket('left')}
          >
            ←
          </button>
          <button
            className="control-button"
            onMouseDown={() => moveBucket('right')}
          >
            →
          </button>
        </div>
      )}
    </div>
  );
};

export default WaterDropGame;
