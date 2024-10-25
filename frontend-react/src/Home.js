// src/Home.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Home.css'; // Custom CSS

const Home = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [paragraphs, setParagraphs] = useState([]);
  const [showButton, setShowButton] = useState(false); // New state for button visibility
  
  const fullTitle = "Weather Application";
  const fullParagraphs = [
    "This application allows you to view the current weather and forecasts for your favorite locations.",
    "➡️ Real-Time Weather Updates ☀️",
    "➡️ User-Friendly Temperature Conversion 🌡️",
    "➡️ Daily Weather Summary 📅",
    "➡️ Configurable Alerting Thresholds ⚠️",
    "➡️ Persistent Data Storage 💾",
    "➡️ Weather Data Visualizations 📊"
  ];

  useEffect(() => {
    // Reveal title character by character
    let titleTimeout;
    let titleIndex = 0;

    titleTimeout = setInterval(() => {
      if (titleIndex < fullTitle.length) {
        setTitle((prev) => prev + fullTitle[titleIndex]);
        titleIndex++;
      } else {
        clearInterval(titleTimeout);
        revealParagraphs();
      }
    }, 100); // Adjust the speed as needed

    return () => clearInterval(titleTimeout);
  }, []);

  const revealParagraphs = () => {
    let paragraphTimeout;
    let paragraphIndex = 0;

    paragraphTimeout = setInterval(() => {
      if (paragraphIndex < fullParagraphs.length) {
        setParagraphs((prev) => [...prev, fullParagraphs[paragraphIndex]]);
        paragraphIndex++;
      } else {
        clearInterval(paragraphTimeout);
        setShowButton(true); // Show the button after revealing paragraphs
      }
    }, 50); // Faster speed for paragraphs
  };

  return (
    <div className="home-container">
      <div className="left">
        <h1 className="gradient-text"><b>{title}</b></h1>
        {paragraphs.map((text, index) => (
          <p key={index} style={{ fontSize: '24px', textAlign: 'left', marginLeft: '30px' }}>
            {text}
          </p>
        ))}
      </div>
      <div className="right">
        {showButton && (
          <button className="navigate-button zoom-in" onClick={() => navigate('/weather')}>
            Check Live Weather →
          </button>
        )}
      </div>
    </div>
  );
};

export default Home;
