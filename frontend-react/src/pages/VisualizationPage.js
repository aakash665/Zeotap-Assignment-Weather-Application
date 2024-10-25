import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import '../styles/VisualizationPage.css'; 


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const cities = {
  Chennai: { lat: 13.0827, lon: 80.2707 },
  Hyderabad: { lat: 17.3850, lon: 78.4867 },
  Mumbai: { lat: 19.0760, lon: 72.8777 },
  Bangalore: { lat: 12.9716, lon: 77.5946 },
  Kolkata: { lat: 22.5726, lon: 88.3639 },
  Delhi: { lat: 28.7041, lon: 77.1025 },
};

const VisualizationPage = () => {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState([]);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const apiKey = 'c801438dafa78be0f1b6a5053cdaa651';

  // Toast message when city is changed
  const handleCityChange = (e) => {
    const newCity = e.target.value;
    setSelectedCity(newCity);
    if (newCity) {
      toast.info(`City changed to: ${newCity}`, {
        position: "top-center",
        autoClose: 3000, 
      });
    }
  };

  useEffect(() => {
    if (selectedCity) {
      const { lat, lon } = cities[selectedCity];
      const startTime = Math.floor(Date.now() / 1000) - 86400; 
      const cnt = 24;

      axios
        .get(`https://history.openweathermap.org/data/2.5/history/city`, {
          params: {
            lat,
            lon,
            type: 'hour',
            start: startTime,
            cnt,
            appid: apiKey,
          },
        })
        .then((response) => {
          const list = response.data.list;
          setWeatherData(list);

          if (list && list.length > 0) {
            const temps = list.map((item) => item.main.temp);
            const feelsLike = list.map((item) => item.main.feels_like);
            const pressure = list.map((item) => item.main.pressure);
            const humidity = list.map((item) => item.main.humidity);
            const windSpeed = list.map((item) => item.wind.speed);
            const timestamps = list.map((item) => new Date(item.dt * 1000).toLocaleTimeString());

            setChartData({
              labels: timestamps,
              datasets: [
                {
                  label: 'Temperature (K)',
                  data: temps,
                  borderColor: 'rgba(255, 99, 132, 1)',
                  fill: false,
                },
                {
                  label: 'Feels Like (K)',
                  data: feelsLike,
                  borderColor: 'rgba(54, 162, 235, 1)',
                  fill: false,
                },
                {
                  label: 'Pressure (hPa)',
                  data: pressure,
                  borderColor: 'rgba(255, 206, 86, 1)',
                  fill: false,
                },
                {
                  label: 'Humidity (%)',
                  data: humidity,
                  borderColor: 'rgba(75, 192, 192, 1)',
                  fill: false,
                },
                {
                  label: 'Wind Speed (m/s)',
                  data: windSpeed,
                  borderColor: 'rgba(153, 102, 255, 1)',
                  fill: false,
                },
              ],
            });
          }
        })
        .catch((error) => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [selectedCity]);

  return (
    <div>
      <h1>Weather Data Visualization</h1>
      <div className="dropdown-container">
        <label htmlFor="city">Select a city:</label>
        <select id="city" value={selectedCity} onChange={handleCityChange}>
          <option value="">--Select a city--</option>
          {Object.keys(cities).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {weatherData.length > 0 && chartData.datasets.length > 0 && (
        <div className="chart-container">
          <Line data={chartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
};

export default VisualizationPage;
