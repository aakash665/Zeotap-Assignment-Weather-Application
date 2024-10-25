import React, { useState } from 'react';
import '../styles/AlertDialog.css'; 

const AlertDialog = ({ onClose }) => {
  const [city, setCity] = useState('');
  const [threshold, setThreshold] = useState('');
  const [condition, setCondition] = useState('exceeds');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('City:', city);
    console.log('Threshold:', threshold);
    console.log('Condition:', condition);
    onClose(); 
  };

  return (
    <div className="alert-dialog">
      <div className="dialog-content">
        <h3>Create Weather Alert</h3>
        <form onSubmit={handleSubmit}>
          {/* City Dropdown */}
          <label>City</label>
          <select value={city} onChange={(e) => setCity(e.target.value)} required>
            <option value="" disabled>Select city</option>
            <option value="Delhi">Delhi</option>
            <option value="Mumbai">Mumbai</option>
            <option value="Chennai">Chennai</option>
            <option value="Bangalore">Bangalore</option>
            <option value="Kolkata">Kolkata</option>
            <option value="Hyderabad">Hyderabad</option>
          </select>

          <label>Threshold (°C)</label>
          <input
            type="number"
            step="0.1"
            placeholder="Enter threshold"
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            required
          />

          <label>Condition</label>
          <select value={condition} onChange={(e) => setCondition(e.target.value)} required>
            <option value="exceeds">Exceeds threshold</option>
            <option value="falls below">Falls below threshold</option>
          </select>
          <button type="submit">Create Alert</button>
        </form>

        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default AlertDialog;
