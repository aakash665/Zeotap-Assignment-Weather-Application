import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/PastDataPage.css'; 

const PastDataPage = () => {
  const navigate = useNavigate(); 

  const cities = [
    { city: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { city: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { city: 'Chennai', lat: 13.0827, lon: 80.2707 },
    { city: 'Bangalore', lat: 12.9716, lon: 77.5946 },
    { city: 'Kolkata', lat: 22.5726, lon: 88.3639 },
  ];

  const [selectedCity, setSelectedCity] = useState(cities[0].city);
  const [date, setDate] = useState('');
  const [weatherData, setWeatherData] = useState(null);

  const fetchPastWeatherData = async () => {
    const city = cities.find((c) => c.city === selectedCity);
    const API_KEY = 'dd1b33318831448ca5aaf685b6659de8';
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
    );
    const data = await response.json();
    setWeatherData({
      temp: data.main.temp,
      weather: `${data.weather[0].main} - ${data.weather[0].description}`,
      feels_like: data.main.feels_like,
      temp_min: data.main.temp_min,
      temp_max: data.main.temp_max,
      pressure: data.main.pressure,
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
    });
  };

  return (
    <div className="past-data-page">


      <h2>Past Weather Data</h2>

      <div className="table-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        Back
      </button>
        <div>
          <label>Select City:</label>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
          >
            {cities.map((city, index) => (
              <option key={index} value={city.city}>
                {city.city}
              </option>
            ))}
          </select>
        </div>

        <div className="date-picker">
          <label>Select Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button className="get-weather-button" onClick={fetchPastWeatherData}>Get Weather Data</button>

        {weatherData && (
          <div>
            <h3>Weather Details:</h3>
            <table className="past-data-table">
              <tbody>
                <tr>
                  <td data-param="temperature">Temperature</td>
                  <td>{weatherData.temp} °C</td>
                </tr>
                <tr>
                  <td data-param="weather">Weather</td>
                  <td>{weatherData.weather}</td>
                </tr>
                <tr>
                  <td data-param="feels_like">Feels Like</td>
                  <td>{weatherData.feels_like} °C</td>
                </tr>
                <tr>
                  <td data-param="temp_min">Min Temp</td>
                  <td>{weatherData.temp_min} °C</td>
                </tr>
                <tr>
                  <td data-param="temp_max">Max Temp</td>
                  <td>{weatherData.temp_max} °C</td>
                </tr>
                <tr>
                  <td data-param="pressure">Pressure</td>
                  <td>{weatherData.pressure} hPa</td>
                </tr>
                <tr>
                  <td data-param="humidity">Humidity</td>
                  <td>{weatherData.humidity}%</td>
                </tr>
                <tr>
                  <td data-param="wind">Wind Speed</td>
                  <td>{weatherData.wind_speed} m/s</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PastDataPage;
