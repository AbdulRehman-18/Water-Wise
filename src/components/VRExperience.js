import React from 'react';
import './VRExperience.css';

const VRExperience = () => {
  return (
    <div className="vr-container">
      <div className="vr-development">
        <div className="development-content">
          <span className="dev-icon">🚧</span>
          <h1>VR Experience Coming Soon</h1>
          <p>We're working on something amazing! Our virtual reality experience is currently under development.</p>
          
          <div className="feature-preview">
            <h2>What to Expect</h2>
            <div className="preview-grid">
              <div className="preview-item">
                <span className="preview-icon">🌊</span>
                <h3>Water Flow Simulation</h3>
                <p>Visualize campus water systems in immersive 3D</p>
              </div>
              <div className="preview-item">
                <span className="preview-icon">🏗️</span>
                <h3>Infrastructure Tour</h3>
                <p>Explore conservation facilities virtually</p>
              </div>
              <div className="preview-item">
                <span className="preview-icon">📡</span>
                <h3>Smart Monitoring</h3>
                <p>Interactive IoT sensor network visualization</p>
              </div>
            </div>
          </div>

          <div className="development-status">
            <div className="status-bar">
              <div className="status-progress"></div>
            </div>
            <p className="status-text">Development in Progress</p>
          </div>

          <div className="notify-section">
            <p>Want to be notified when it's ready?</p>
            <button className="notify-btn" disabled>Stay Updated</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VRExperience;
