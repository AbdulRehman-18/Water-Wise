import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  const features = [
    {
      title: 'AITM Water Monitoring',
      description: 'Real-time tracking of water usage across different campus buildings and facilities',
      link: '/water-usage',
      color: 'blue'
    },
    {
      title: 'Leak Detection System',
      description: 'AI-powered system to detect and report water leaks in campus infrastructure',
      link: '/report-leak',
      color: 'green'
    },
    {
      title: 'Conservation Dashboard',
      description: 'View water consumption patterns, savings, and conservation goals for your campus',
      link: '/community',
      color: 'purple'
    },
    {
      title: 'Educational Resources',
      description: 'Interactive learning materials about water conservation for campus community',
      link: '/games',
      color: 'orange'
    },
    {
      title: 'Virtual Campus Tour',
      description: 'Explore water conservation installations across campus in VR',
      link: '/virtual-reality',
      color: 'pink'
    }
  ];

  const stats = [
    {
      value: '45%',
      label: 'Water Saved',
      description: 'Reduction in campus water usage'
    },
    {
      value: '24/7',
      label: 'Monitoring',
      description: 'Real-time leak detection'
    },
    {
      value: '100+',
      label: 'Sensors',
      description: 'Across campus buildings'
    }
  ];

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Campus Water Conservation
            <span className="hero-subtitle">Smart Solutions for Sustainable Campus</span>
          </h1>
          <p className="hero-description">
            Monitor, analyze, and optimize water usage across your campus with our cutting-edge technology
          </p>
          <div className="hero-buttons">
            <Link to="/water-usage" className="primary-button">
              View Campus Usage
            </Link>
            <Link to="/report-leak" className="secondary-button">
              Report Issues
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-grid">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} className={`feature-card ${feature.color}`}>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              <span className="feature-link">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-value">{stat.value}</div>
              <h3>{stat.label}</h3>
              <p>{stat.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Make Your Campus Water-Efficient?</h2>
        <p>Join other campus facilities in making a sustainable difference</p>
        <div className="cta-buttons">
          <Link to="/water-usage">Start Monitoring</Link>
          <Link to="/community">View Impact</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
