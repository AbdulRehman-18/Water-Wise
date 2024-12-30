import React, { useState } from 'react';
import './LeakDetection.css';

const LeakDetection = () => {
  const [activeZone, setActiveZone] = useState(null);
  const [leakReports, setLeakReports] = useState([
    { id: 1, location: 'Main Building', severity: 'High', status: 'Active', time: '2 hours ago' },
    { id: 2, location: 'Garden Area', severity: 'Medium', status: 'Fixed', time: '1 day ago' },
    { id: 3, location: 'Parking Lot', severity: 'Low', status: 'Under Review', time: '3 hours ago' }
  ]);

  const zones = [
    { id: 1, name: 'Main Building', status: 'Normal', sensors: 12 },
    { id: 2, name: 'Garden Area', status: 'Warning', sensors: 8 },
    { id: 3, name: 'Parking Lot', status: 'Alert', sensors: 6 },
    { id: 4, name: 'Cafeteria', status: 'Normal', sensors: 10 }
  ];

  const handleReportLeak = () => {
    // Handle leak reporting logic
  };

  return (
    <div className="leak-container">
      <section className="leak-hero">
        <h1 className="leak-title">Smart Leak Detection</h1>
        <p className="leak-subtitle">
          Advanced AI-powered system to detect and prevent water leaks
        </p>
      </section>

      <div className="leak-dashboard">
        <div className="monitoring-zones">
          <h2>Monitoring Zones</h2>
          <div className="zones-grid">
            {zones.map(zone => (
              <div 
                key={zone.id}
                className={`zone-card ${zone.status.toLowerCase()} ${activeZone === zone.id ? 'active' : ''}`}
                onClick={() => setActiveZone(zone.id)}
              >
                <div className="zone-header">
                  <h3>{zone.name}</h3>
                  <span className="status-badge">{zone.status}</span>
                </div>
                <div className="zone-details">
                  <span className="sensor-count">
                    <i className="sensor-icon">📡</i>
                    {zone.sensors} Sensors Active
                  </span>
                  <div className="status-indicator"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="leak-reports">
          <div className="reports-header">
            <h2>Recent Reports</h2>
            <button className="report-button" onClick={handleReportLeak}>
              Report Leak
            </button>
          </div>
          <div className="reports-list">
            {leakReports.map(report => (
              <div key={report.id} className={`report-card ${report.severity.toLowerCase()}`}>
                <div className="report-header">
                  <h3>{report.location}</h3>
                  <span className="severity-badge">{report.severity}</span>
                </div>
                <div className="report-details">
                  <span className="status-text">{report.status}</span>
                  <span className="time-text">{report.time}</span>
                </div>
                <div className="report-actions">
                  <button className="action-button">View Details</button>
                  {report.status === 'Active' && (
                    <button className="action-button urgent">Mark Fixed</button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="system-status">
        <h2>System Status</h2>
        <div className="status-grid">
          <div className="status-card">
            <span className="status-icon">🟢</span>
            <h3>AI Detection</h3>
            <p>Operating normally</p>
          </div>
          <div className="status-card">
            <span className="status-icon">🟢</span>
            <h3>Sensor Network</h3>
            <p>36/36 online</p>
          </div>
          <div className="status-card">
            <span className="status-icon">🟡</span>
            <h3>Response Time</h3>
            <p>2.3s (slightly high)</p>
          </div>
          <div className="status-card">
            <span className="status-icon">🟢</span>
            <h3>Alert System</h3>
            <p>Fully operational</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeakDetection;
