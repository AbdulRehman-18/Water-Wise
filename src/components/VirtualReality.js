import React from 'react';
import { Link } from 'react-router-dom';
import './VirtualReality.css';

const VirtualReality = () => {
  return (
    <div className="vr-container">
      <section className="vr-hero">
        <h1 className="vr-title">Virtual Reality Experience</h1>
        <p className="vr-subtitle">
          Immerse yourself in interactive water conservation scenarios and learn through virtual experiences
        </p>
      </section>

      <div className="vr-features">
        <div className="vr-card">
          <div className="vr-icon">🏰</div>
          <h3 className="vr-card-title">Virtual City Tour</h3>
          <p className="vr-description">
            Explore a virtual city and discover water conservation challenges and solutions
          </p>
          <Link to="/vr/city-tour" className="vr-link">
            Start Tour →
          </Link>
        </div>

        <div className="vr-card">
          <div className="vr-icon">🔍</div>
          <h3 className="vr-card-title">Leak Detection Simulator</h3>
          <p className="vr-description">
            Practice identifying and fixing water leaks in a virtual environment
          </p>
          <Link to="/vr/simulator" className="vr-link">
            Try Simulator →
          </Link>
        </div>

        <div className="vr-card">
          <div className="vr-icon">🎓</div>
          <h3 className="vr-card-title">Educational Scenarios</h3>
          <p className="vr-description">
            Learn about water conservation through interactive VR scenarios
          </p>
          <Link to="/vr/scenarios" className="vr-link">
            Start Learning →
          </Link>
        </div>
      </div>

      <div className="vr-instructions">
        <h2 className="instructions-title">How to Use VR Mode</h2>
        <div className="instructions-grid">
          <div className="instruction-step">
            <span className="step-number">1</span>
            <h3>Put on VR Headset</h3>
            <p>Use any compatible VR headset for the best experience</p>
          </div>
          <div className="instruction-step">
            <span className="step-number">2</span>
            <h3>Launch Experience</h3>
            <p>Select your desired scenario from the options above</p>
          </div>
          <div className="instruction-step">
            <span className="step-number">3</span>
            <h3>Interact & Learn</h3>
            <p>Use the VR controllers to interact with the environment</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VirtualReality;
