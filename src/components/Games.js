import React from 'react';
import { Link } from 'react-router-dom';
import './Games.css';

const Games = () => {
  const games = [
    {
      id: 1,
      title: 'Water Drop Catcher',
      description: 'Catch falling water drops to save water and score points!',
      icon: '💧',
      link: '/games/water-drop',
      available: true,
      difficulty: 'Easy',
      playTime: '5 mins'
    },
    {
      id: 2,
      title: 'Water Conservation Quiz',
      description: 'Test your knowledge about water conservation with our AI-powered quiz!',
      icon: '🎯',
      link: '/games/quiz',
      available: true,
      new: true,
      difficulty: 'Medium',
      playTime: '10 mins'
    },
    {
      id: 3,
      title: 'Eco City Builder',
      description: 'Build a water-efficient city and manage resources!',
      icon: '🏗️',
      link: '/games/city-builder',
      available: false,
      difficulty: 'Hard',
      playTime: '15 mins'
    },
    {
      id: 4,
      title: 'Pipeline Puzzle',
      description: 'Connect the pipes to create an efficient water distribution system!',
      icon: '🔧',
      link: '/games/pipeline',
      available: true,
      difficulty: 'Medium',
      playTime: '8 mins'
    },
    {
      id: 5,
      title: 'Water Hero',
      description: 'Complete daily challenges to become a water conservation champion!',
      icon: '🦸‍♂️',
      link: '/games/water-hero',
      available: true,
      difficulty: 'Easy',
      playTime: '5 mins',
      new: true
    }
  ];

  const difficultyColors = {
    'Easy': '#4CAF50',
    'Medium': '#FFC107',
    'Hard': '#FF5252'
  };

  return (
    <div className="games-container">
      <div className="games-header">
        <h1>Water Conservation Games</h1>
        <p>Learn about water conservation through interactive games!</p>
        
        <div className="games-filters">
          <div className="difficulty-legend">
            <span className="legend-item">
              <span className="dot" style={{ backgroundColor: difficultyColors['Easy'] }}></span>
              Easy
            </span>
            <span className="legend-item">
              <span className="dot" style={{ backgroundColor: difficultyColors['Medium'] }}></span>
              Medium
            </span>
            <span className="legend-item">
              <span className="dot" style={{ backgroundColor: difficultyColors['Hard'] }}></span>
              Hard
            </span>
          </div>
        </div>
      </div>

      <div className="games-grid">
        {games.map((game) => (
          <div 
            key={game.id} 
            className={`game-card ${game.new ? 'new-game' : ''}`}
            style={{
              '--difficulty-color': difficultyColors[game.difficulty]
            }}
          >
            {game.available ? (
              <Link to={game.link} className="game-link">
                <div className="game-icon">{game.icon}</div>
                <div className="game-info">
                  <h3 className="game-title">
                    {game.title}
                    {game.new && <span className="new-badge">NEW!</span>}
                  </h3>
                  <p className="game-description">{game.description}</p>
                  <div className="game-meta">
                    <span className="difficulty" style={{ color: difficultyColors[game.difficulty] }}>
                      {game.difficulty}
                    </span>
                    <span className="playtime">⏱️ {game.playTime}</span>
                  </div>
                </div>
                <div className="play-button">Play Now</div>
              </Link>
            ) : (
              <div className="game-content">
                <div className="game-icon">{game.icon}</div>
                <div className="game-info">
                  <h3 className="game-title">{game.title}</h3>
                  <p className="game-description">{game.description}</p>
                  <div className="game-meta">
                    <span className="difficulty" style={{ color: difficultyColors[game.difficulty] }}>
                      {game.difficulty}
                    </span>
                    <span className="playtime">⏱️ {game.playTime}</span>
                  </div>
                </div>
                <div className="coming-soon">Coming Soon</div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="games-footer">
        <div className="achievement-preview">
          <h3>🏆 Achievements</h3>
          <div className="achievements-grid">
            <div className="achievement locked">
              <span className="achievement-icon">🌟</span>
              <span>Complete all games</span>
            </div>
            <div className="achievement locked">
              <span className="achievement-icon">🎯</span>
              <span>Score 1000+ points</span>
            </div>
            <div className="achievement locked">
              <span className="achievement-icon">⚡</span>
              <span>Daily streak: 7 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games;
