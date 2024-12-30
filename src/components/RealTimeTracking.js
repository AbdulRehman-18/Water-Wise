import React, { useState, useEffect } from 'react';
import './RealTimeTracking.css';

const RealTimeTracking = () => {
  const [waterData, setWaterData] = useState({
    currentUsage: 2500,
    dailyTarget: 3000,
    weeklyStats: [2400, 2600, 2300, 2800, 2500, 2700, 2500],
    savingsPercent: 15,
    peakHours: ['8:00 AM', '7:00 PM']
  });

  const [timeOfDay, setTimeOfDay] = useState('');

  useEffect(() => {
    // Update time of day
    const updateTime = () => {
      const now = new Date();
      setTimeOfDay(now.toLocaleTimeString());
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    // Simulate real-time data updates
    const dataTimer = setInterval(() => {
      setWaterData(prev => ({
        ...prev,
        currentUsage: prev.currentUsage + Math.floor(Math.random() * 21) - 10,
      }));
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(dataTimer);
    };
  }, []);

  return (
    <div className="tracking-container">
      <section className="tracking-hero">
        <h1 className="tracking-title">Real-Time Water Monitoring</h1>
        <p className="tracking-subtitle">
          Track and optimize your water usage with advanced analytics
        </p>
        <div className="current-time">{timeOfDay}</div>
      </section>

      <div className="dashboard-grid">
        <div className="usage-card">
          <h3>Current Usage</h3>
          <div className="usage-meter">
            <div 
              className="usage-fill" 
              style={{ 
                width: `${(waterData.currentUsage / waterData.dailyTarget) * 100}%`,
                backgroundColor: waterData.currentUsage > waterData.dailyTarget ? '#ff4757' : '#00d2d3'
              }}
            ></div>
          </div>
          <div className="usage-stats">
            <span>{waterData.currentUsage} L</span>
            <span>Target: {waterData.dailyTarget} L</span>
          </div>
        </div>

        <div className="savings-card">
          <h3>Water Savings</h3>
          <div className="savings-circle">
            <svg viewBox="0 0 36 36">
              <path
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="#00d2d3"
                strokeWidth="2"
                strokeDasharray={`${waterData.savingsPercent}, 100`}
              />
            </svg>
            <span className="savings-percent">{waterData.savingsPercent}%</span>
          </div>
          <p>Saved compared to last month</p>
        </div>

        <div className="weekly-trends">
          <h3>Weekly Trends</h3>
          <div className="trend-graph">
            {waterData.weeklyStats.map((value, index) => (
              <div 
                key={index} 
                className="trend-bar"
                style={{ height: `${(value / 3000) * 100}%` }}
              >
                <span className="trend-value">{value}L</span>
              </div>
            ))}
          </div>
          <div className="trend-labels">
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
            <span>Sun</span>
          </div>
        </div>

        <div className="peak-hours">
          <h3>Peak Usage Hours</h3>
          <div className="hours-grid">
            {waterData.peakHours.map((hour, index) => (
              <div key={index} className="peak-hour-card">
                <span className="hour-label">{hour}</span>
                <span className="hour-icon">⚡</span>
              </div>
            ))}
          </div>
          <p>Consider shifting usage to off-peak hours</p>
        </div>
      </div>

      <div className="tips-section">
        <h2>Smart Tips</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <span className="tip-icon">💡</span>
            <p>Shift laundry to off-peak hours to reduce system load</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">🚰</span>
            <p>Current usage trending above average - consider reducing outdoor watering</p>
          </div>
          <div className="tip-card">
            <span className="tip-icon">📊</span>
            <p>You're 15% more efficient than similar households</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealTimeTracking;
