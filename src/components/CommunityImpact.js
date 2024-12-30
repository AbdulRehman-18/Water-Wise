import React, { useState } from 'react';
import './CommunityImpact.css';

const CommunityImpact = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  const communityStats = {
    totalSaved: '2.5M',
    activeUsers: '12,450',
    challenges: '25',
    trees: '5,000'
  };

  const leaderboard = [
    { rank: 1, name: 'Green Campus Initiative', saved: '500,000', members: 234 },
    { rank: 2, name: 'Water Warriors', saved: '350,000', members: 189 },
    { rank: 3, name: 'Eco Champions', saved: '275,000', members: 156 },
    { rank: 4, name: 'Conservation Club', saved: '225,000', members: 143 },
    { rank: 5, name: 'Blue Planet Society', saved: '180,000', members: 128 }
  ];

  const challenges = [
    {
      title: '5-Minute Shower Challenge',
      participants: 1250,
      saved: '25,000',
      status: 'active',
      daysLeft: 5
    },
    {
      title: 'Fix a Leak Week',
      participants: 850,
      saved: '15,000',
      status: 'active',
      daysLeft: 3
    },
    {
      title: 'Smart Irrigation Month',
      participants: 2000,
      saved: '100,000',
      status: 'upcoming',
      daysLeft: 10
    }
  ];

  const achievements = [
    { title: 'Water Warrior', description: 'Save 1000 gallons', progress: 85 },
    { title: 'Community Leader', description: 'Complete 5 challenges', progress: 60 },
    { title: 'Leak Detective', description: 'Report 3 leaks', progress: 100 },
    { title: 'Conservation Expert', description: 'Maintain optimal usage for 30 days', progress: 40 }
  ];

  return (
    <div className="community-container">
      <section className="community-hero">
        <h1 className="community-title">Community Impact</h1>
        <p className="community-subtitle">Together, we're making waves of change</p>
        
        <div className="impact-stats">
          <div className="impact-card">
            <h3>Water Saved</h3>
            <div className="stat-value">{communityStats.totalSaved}</div>
            <p>Gallons this month</p>
          </div>
          <div className="impact-card">
            <h3>Active Members</h3>
            <div className="stat-value">{communityStats.activeUsers}</div>
            <p>And growing</p>
          </div>
          <div className="impact-card">
            <h3>Active Challenges</h3>
            <div className="stat-value">{communityStats.challenges}</div>
            <p>Join now</p>
          </div>
          <div className="impact-card">
            <h3>Trees Saved</h3>
            <div className="stat-value">{communityStats.trees}</div>
            <p>Through water conservation</p>
          </div>
        </div>
      </section>

      <section className="leaderboard-section">
        <h2>Community Leaderboard</h2>
        <div className="period-selector">
          <button 
            className={selectedPeriod === 'week' ? 'active' : ''} 
            onClick={() => setSelectedPeriod('week')}
          >
            This Week
          </button>
          <button 
            className={selectedPeriod === 'month' ? 'active' : ''} 
            onClick={() => setSelectedPeriod('month')}
          >
            This Month
          </button>
          <button 
            className={selectedPeriod === 'year' ? 'active' : ''} 
            onClick={() => setSelectedPeriod('year')}
          >
            This Year
          </button>
        </div>
        <div className="leaderboard-table">
          {leaderboard.map((team) => (
            <div key={team.rank} className="leaderboard-row">
              <div className="rank">#{team.rank}</div>
              <div className="team-info">
                <h3>{team.name}</h3>
                <p>{team.members} members</p>
              </div>
              <div className="saved-amount">
                <span>{team.saved}</span>
                <p>Gallons saved</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="challenges-section">
        <h2>Active Challenges</h2>
        <div className="challenges-grid">
          {challenges.map((challenge, index) => (
            <div key={index} className={`challenge-card ${challenge.status}`}>
              <h3>{challenge.title}</h3>
              <div className="challenge-stats">
                <div className="stat">
                  <span>{challenge.participants}</span>
                  <p>Participants</p>
                </div>
                <div className="stat">
                  <span>{challenge.saved}</span>
                  <p>Gallons Saved</p>
                </div>
              </div>
              <div className="challenge-footer">
                <span className={`status-badge ${challenge.status}`}>
                  {challenge.status === 'active' ? `${challenge.daysLeft} days left` : 'Starting Soon'}
                </span>
                <button className="join-button">Join Challenge</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="achievements-section">
        <h2>Your Achievements</h2>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div key={index} className="achievement-card">
              <div className="achievement-info">
                <h3>{achievement.title}</h3>
                <p>{achievement.description}</p>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${achievement.progress}%` }}
                ></div>
              </div>
              <span className="progress-text">{achievement.progress}%</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CommunityImpact;
