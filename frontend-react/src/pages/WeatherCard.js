import React, { useState } from 'react';
import '../styles/WeatherCard.css';

const WeatherCard = ({ weather }) => {
  const [isKelvin, setIsKelvin] = useState(false);

  const toggleTempUnit = () => {
    setIsKelvin(prevState => !prevState);
  };

  const temperature = isKelvin ? weather.temp + 273.15 : weather.temp;
  const feelsLike = isKelvin ? weather.feels_like + 273.15 : weather.feels_like;
  const tempMin = isKelvin ? weather.temp_min + 273.15 : weather.temp_min;
  const tempMax = isKelvin ? weather.temp_max + 273.15 : weather.temp_max;
  const tempUnit = isKelvin ? 'K' : '°C';

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp * 1000); 
    return date.toLocaleString(); 
  };

  return (
    <div className="weather-card">
      <h2>{weather.city}</h2>
      <img src={weather.img} alt={`${weather.city} weather`} className="city-image" />

      <div className="weather-main">
        <table className="weather-table">
          <tbody>
            <tr>
              <td><strong>Temperature 🌡️</strong></td>
              <td>{temperature.toFixed(2)} {tempUnit}</td>
            </tr>
            <tr>
              <td><strong>Weather 🌥️</strong></td>
              <td>{weather.weather_main} - {weather.weather_description}</td>
            </tr>
            <tr>
              <td><strong>Feels Like 🥵</strong></td>
              <td>{feelsLike.toFixed(2)} {tempUnit}</td>
            </tr>
            <tr>
              <td><strong>Min Temperature 🌡️</strong></td>
              <td>{tempMin.toFixed(2)} {tempUnit}</td>
            </tr>
            <tr>
              <td><strong>Max Temperature 🌡️</strong></td>
              <td>{tempMax.toFixed(2)} {tempUnit}</td>
            </tr>
            <tr>
              <td><strong>Pressure 🔵</strong></td>
              <td>{weather.pressure} hPa</td>
            </tr>
            <tr>
              <td><strong>Humidity 💧</strong></td>
              <td>{weather.humidity}%</td>
            </tr>
            <tr>
              <td><strong>Wind Speed 🌪️</strong></td>
              <td>{weather.wind_speed} m/s</td>
            </tr>
            <tr>
              <td><strong>Last Updated on</strong></td>
              <td>{formatTimestamp(weather.last_updated)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Toggle button for temperature unit */}
      <div className="toggle-container">
        <label className="toggle-label">Show in Kelvin</label>
        <label className="switch">
          <input type="checkbox" onChange={toggleTempUnit} checked={isKelvin} />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default WeatherCard;
