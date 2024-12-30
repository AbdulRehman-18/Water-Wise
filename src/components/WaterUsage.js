import React, { useState, useEffect } from 'react';
import './WaterUsage.css';

const WaterUsage = () => {
  // Simulated sensor data - in real implementation, this would come from your IoT sensors
  const [sensorData, setSensorData] = useState({
    totalUsage: 0,
    buildingData: [
      { id: 1, name: 'Main Academic Block', usage: 0, flow: 0 },
      { id: 2, name: 'Library Building', usage: 0, flow: 0 },
      { id: 3, name: 'Student Hostel A', usage: 0, flow: 0 },
      { id: 4, name: 'Student Hostel B', usage: 0, flow: 0 },
      { id: 5, name: 'Sports Complex', usage: 0, flow: 0 },
      { id: 6, name: 'Cafeteria', usage: 0, flow: 0 }
    ],
    alerts: []
  });

  // Simulate real-time updates from sensors
  useEffect(() => {
    const updateSensorData = () => {
      setSensorData(prevData => {
        const updatedBuildings = prevData.buildingData.map(building => ({
          ...building,
          usage: Math.floor(Math.random() * 1000), // Liters
          flow: Math.floor(Math.random() * 20) // L/min
        }));

        const totalUsage = updatedBuildings.reduce((sum, building) => sum + building.usage, 0);

        // Generate alerts based on thresholds
        const alerts = [];
        updatedBuildings.forEach(building => {
          if (building.flow > 15) {
            alerts.push({
              id: Date.now(),
              building: building.name,
              message: 'High water flow detected',
              severity: 'warning'
            });
          }
        });

        return {
          totalUsage,
          buildingData: updatedBuildings,
          alerts: [...prevData.alerts, ...alerts].slice(-5) // Keep last 5 alerts
        };
      });
    };

    // Update every 5 seconds
    const interval = setInterval(updateSensorData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="water-usage-container">
      <div className="usage-header">
        <h1>Campus Water Usage Monitor</h1>
        <p>Real-time data from integrated IoT sensors</p>
      </div>

      <div className="total-usage">
        <div className="usage-card">
          <h2>Total Campus Usage</h2>
          <div className="usage-value">{sensorData.totalUsage.toLocaleString()} L</div>
          <p>Today's consumption</p>
        </div>
      </div>

      <div className="buildings-grid">
        {sensorData.buildingData.map(building => (
          <div key={building.id} className="building-card">
            <h3>{building.name}</h3>
            <div className="building-stats">
              <div className="stat">
                <label>Current Usage</label>
                <value>{building.usage.toLocaleString()} L</value>
              </div>
              <div className="stat">
                <label>Flow Rate</label>
                <value>{building.flow} L/min</value>
              </div>
            </div>
            <div className={`flow-indicator ${building.flow > 15 ? 'high' : building.flow > 10 ? 'medium' : 'normal'}`}>
              Flow Status
            </div>
          </div>
        ))}
      </div>

      <div className="alerts-section">
        <h2>Recent Alerts</h2>
        <div className="alerts-list">
          {sensorData.alerts.map((alert, index) => (
            <div key={alert.id} className={`alert-item ${alert.severity}`}>
              <span className="alert-building">{alert.building}</span>
              <span className="alert-message">{alert.message}</span>
              <span className="alert-time">Just now</span>
            </div>
          ))}
          {sensorData.alerts.length === 0 && (
            <div className="no-alerts">No alerts at this time</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaterUsage;
