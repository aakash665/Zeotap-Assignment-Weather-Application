import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/WeatherDataPage.css'; 
import { useNavigate } from 'react-router-dom'; 


const WeatherDataPage = () => {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/weather');
        setWeatherData(response.data);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="weather-data-container">
      <h1 className="page-title">Weather Data</h1>

      {loading ? (
        <p>Loading weather data...</p>
      ) : (
        <table className="weather-table">
          <thead>
            <tr>
              <th>City</th>
              <th>Date</th>
              <th>Temperature (°C)</th>
              <th>Weather</th>
              <th>Min Temp (°C)</th>
              <th>Max Temp (°C)</th>
              <th>Pressure (hPa)</th>
              <th>Humidity (%)</th>
              <th>Wind Speed (m/s)</th>
            </tr>
          </thead>
          <tbody>
            {weatherData.map((data, index) => (
              <tr key={index} className={`weather-row fade-in-row row-${index}`}>
                <td>{data.cityname}</td>
                <td>{data.date}</td>
                <td>{data.temp}</td>
                <td>{data.weather}</td>
                <td>{data.min_temp}</td>
                <td>{data.max_temp}</td>
                <td>{data.pressure}</td>
                <td>{data.humidity}</td>
                <td>{data.windspeed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default WeatherDataPage;
