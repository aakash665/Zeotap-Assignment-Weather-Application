// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import WeatherPage from './pages/WeatherPage';
import VisualizationPage from './pages/VisualizationPage'; 
import PastDataPage from './pages/PastDataPage'; 
import './styles/App.css'; 
import axios from 'axios';
import WeatherDataPage from './pages/WeatherDataPage'; 





function App() {
  const cities = [
    { city: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { city: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { city: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { city: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { city: 'Kolkata', lat: 22.5726, lon: 88.3639 },
    { city: 'Hyderabad', lat: 17.3850, lon: 78.4867 } // Corrected Hyderabad coordinates
  ];

  const API_KEY = 'dd1b33318831448ca5aaf685b6659de8';

  useEffect(() => {
    // Function to fetch weather data and send to backend
    const fetchWeatherData = async () => {
      const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

      try {
        // Loop through each city and fetch the weather data
        for (let i = 0; i < cities.length; i++) {
          const city = cities[i];
          console.log(`Fetching weather data for ${city.city}...`);
          
          // Fetch weather data from OpenWeatherMap API
          const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
          );
          const data = response.data;
          console.log(`Weather data for ${city.city} fetched successfully.`);

          // Construct weather data object to send to the backend
          const weatherData = {
            date: today,
            cityname: city.city,
            temp: data.main.temp,
            weather: `${data.weather[0].main} - ${data.weather[0].description}`,
            min_temp: data.main.temp_min,
            max_temp: data.main.temp_max,
            pressure: data.main.pressure,
            humidity: data.main.humidity,
            windspeed: data.wind.speed
          };

          // Log the weather data being sent to the backend
          console.log(`Sending weather data for ${city.city} to the backend...`, weatherData);

          // Send the data to the backend API (replace with actual backend URL)
          await axios.post('http://localhost:5000/api/weather', weatherData);

          // Log successful data send
          console.log(`Weather data for ${city.city} successfully sent to the backend.`);
        }
      } catch (error) {
        // Log any errors during the data fetching or sending process
        console.error('Error fetching or sending weather data:', error);
      }
    };

    fetchWeatherData(); // Fetch and send the weather data
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Ignore the cities dependency warning safely

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/weather" element={<WeatherPage />} />
          <Route path="/visualization" element={<VisualizationPage />} />
          <Route path="/past-data" element={<PastDataPage />} />
          <Route path="/weather-data" element={<WeatherDataPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
