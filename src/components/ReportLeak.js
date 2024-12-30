import React, { useState } from 'react';
import './ReportLeak.css';

const ReportLeak = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    location: '',
    building: '',
    floor: '',
    severity: 'medium',
    description: '',
    reporterName: '',
    contactNumber: '',
    image: null
  });

  const buildings = [
    'Main Academic Block',
    'Library Building',
    'Student Hostel A',
    'Student Hostel B',
    'Sports Complex',
    'Cafeteria'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the form submission
    console.log('Form submitted:', formData);
    // Reset form and show success message
    setStep(3);
  };

  const renderStep1 = () => (
    <div className="report-step">
      <h2>Location Details</h2>
      <div className="form-grid">
        <div className="form-group">
          <label>Building</label>
          <select 
            name="building" 
            value={formData.building}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Building</option>
            {buildings.map(building => (
              <option key={building} value={building}>{building}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Floor/Level</label>
          <input
            type="text"
            name="floor"
            value={formData.floor}
            onChange={handleInputChange}
            placeholder="e.g., Ground Floor, First Floor"
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Specific Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            placeholder="e.g., Near Room 101, Main Corridor"
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Severity Level</label>
          <div className="severity-options">
            <label className={`severity-option ${formData.severity === 'low' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="severity"
                value="low"
                checked={formData.severity === 'low'}
                onChange={handleInputChange}
              />
              <span className="severity-icon">🔵</span>
              <span>Low</span>
              <small>Minor drip or seepage</small>
            </label>

            <label className={`severity-option ${formData.severity === 'medium' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="severity"
                value="medium"
                checked={formData.severity === 'medium'}
                onChange={handleInputChange}
              />
              <span className="severity-icon">🟡</span>
              <span>Medium</span>
              <small>Steady leak or drip</small>
            </label>

            <label className={`severity-option ${formData.severity === 'high' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="severity"
                value="high"
                checked={formData.severity === 'high'}
                onChange={handleInputChange}
              />
              <span className="severity-icon">🔴</span>
              <span>High</span>
              <small>Major leak or burst pipe</small>
            </label>
          </div>
        </div>
      </div>
      <button className="next-btn" onClick={() => setStep(2)}>Next Step</button>
    </div>
  );

  const renderStep2 = () => (
    <div className="report-step">
      <h2>Additional Details</h2>
      <div className="form-grid">
        <div className="form-group full-width">
          <label>Description of the Leak</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Please provide details about the leak..."
            required
          />
        </div>

        <div className="form-group">
          <label>Your Name</label>
          <input
            type="text"
            name="reporterName"
            value={formData.reporterName}
            onChange={handleInputChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label>Contact Number</label>
          <input
            type="tel"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleInputChange}
            placeholder="Enter your contact number"
            required
          />
        </div>

        <div className="form-group full-width">
          <label>Upload Image (Optional)</label>
          <div className="file-upload">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              id="image-upload"
            />
            <label htmlFor="image-upload" className="file-upload-label">
              {formData.image ? '✓ Image Selected' : '📸 Add Photo'}
            </label>
            {formData.image && (
              <span className="file-name">{formData.image.name}</span>
            )}
          </div>
        </div>
      </div>

      <div className="button-group">
        <button className="back-btn" onClick={() => setStep(1)}>Back</button>
        <button className="submit-btn" onClick={handleSubmit}>Submit Report</button>
      </div>
    </div>
  );

  const renderSuccess = () => (
    <div className="success-message">
      <div className="success-icon">✓</div>
      <h2>Report Submitted Successfully!</h2>
      <p>Thank you for reporting the leak. Our maintenance team has been notified and will address the issue promptly.</p>
      <button className="new-report-btn" onClick={() => {
        setFormData({
          location: '',
          building: '',
          floor: '',
          severity: 'medium',
          description: '',
          reporterName: '',
          contactNumber: '',
          image: null
        });
        setStep(1);
      }}>Submit Another Report</button>
    </div>
  );

  return (
    <div className="report-leak-container">
      <div className="report-header">
        <h1>Report a Water Leak</h1>
        <p>Help us maintain our campus by reporting water leaks promptly</p>
      </div>

      {step === 1 && renderStep1()}
      {step === 2 && renderStep2()}
      {step === 3 && renderSuccess()}
    </div>
  );
};

export default ReportLeak;
