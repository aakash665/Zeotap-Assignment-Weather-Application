import React, { useState, useEffect } from 'react';
import '../styles/WeatherPage.css';
import WeatherCard from './WeatherCard';
import { useNavigate } from 'react-router-dom'; 
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 


const API_KEY = 'dd1b33318831448ca5aaf685b6659de8';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const WeatherPage = () => {
    const cities = [
        { city: 'Delhi', lat: 28.6139, lon: 77.2090, img: '/images/delhi.jpg' },
        { city: 'Mumbai', lat: 19.0760, lon: 72.8777, img: '/images/mumbai.jpg' },
        { city: 'Chennai', lat: 13.0827, lon: 80.2707, img: '/images/chennai.jpg' },
        { city: 'Bangalore', lat: 12.9716, lon: 77.5946, img: '/images/bangalore.jpg' },
        { city: 'Kolkata', lat: 22.5726, lon: 88.3639, img: '/images/kolkatta.jpeg' },
        { city: 'Hyderabad', lat: 22.5726, lon: 88.3639, img: '/images/hyderabad.jpg' }
    ];

    const [weatherData, setWeatherData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAlertDialog, setShowAlertDialog] = useState(false); 
    const [alertConfig, setAlertConfig] = useState({
        selectedCity: cities[0].city,
        condition: 'increase',
        thresholdTemp: 0,
    });
    const [monitoring, setMonitoring] = useState(false);
    const [alertsAcknowledged, setAlertsAcknowledged] = useState({});
    const [loadingText, setLoadingText] = useState(''); 
    const navigate = useNavigate();

    const updateLoadingText = (text) => {
        let index = 0;
        const interval = setInterval(() => {
            setLoadingText((prev) => prev + text[index]);
            index++;
            if (index === text.length) {
                clearInterval(interval);
            }
        }, 10); 
    };

    const fetchWeatherData = async () => {
        setLoading(true);
        setLoadingText('');
        updateLoadingText('Loading...');

        const promises = cities.map(async (city) => {
            const response = await fetch(
                `${BASE_URL}?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`
            );
            const data = await response.json();

            return {
                city: city.city,
                temp: data.main.temp,
                feels_like: data.main.feels_like,
                temp_min: data.main.temp_min,
                temp_max: data.main.temp_max,
                pressure: data.main.pressure,
                humidity: data.main.humidity,
                wind_speed: data.wind.speed,
                weather_main: data.weather[0].main,
                weather_description: data.weather[0].description,
                last_updated: data.dt,
                img: city.img,
            };
        });

        const weatherInfo = await Promise.all(promises);
        setWeatherData(weatherInfo);
        setLoading(false); 

        toast.success("Weather data updated", {
            position: "top-right", 
            autoClose: 4000, 
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        fetchWeatherData();
        const interval = setInterval(fetchWeatherData, 200000000); 
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (monitoring) {
            weatherData.forEach((weather) => {
                const isAlertTriggered =
                    (alertConfig.condition === 'increase' && weather.temp > alertConfig.thresholdTemp) ||
                    (alertConfig.condition === 'decrease' && weather.temp < alertConfig.thresholdTemp);

                if (isAlertTriggered && !alertsAcknowledged[weather.city]) {
                    alert(`Temperature alert for ${weather.city}: ${weather.temp}°C crossed threshold of ${alertConfig.thresholdTemp}°C!`);
                }
            });
        }
    }, [weatherData, monitoring, alertConfig, alertsAcknowledged]);

    const handleCreateAlert = () => {
        setMonitoring(true);
        setShowAlertDialog(false);
    };

    const handleAcknowledgeAlert = (city) => {
        setAlertsAcknowledged((prev) => ({ ...prev, [city]: true })); 
    };
    const handleClick = () => {
        navigate('/weather-data'); 
    };

    return (
        <div className={`weather-page ${loading ? 'blurred' : ''}`}>
            <button className="back-button" onClick={() => window.history.back()}>← Back</button>
            <button className="vis-button" onClick={() => navigate('/visualization')}>Visualize</button>
            <button className="bell-button" onClick={() => setShowAlertDialog(true)}>🔔 Create Alert</button>
            <button className="redirect-button" onClick={handleClick}> View Weather Data </button>
            <button className="past-data-button" onClick={() => navigate('/past-data')}>Past Data</button>
            <h1 style={{ fontFamily: 'Arima, sans-serif', fontSize: '56px', fontWeight: '700' }}>
    Weather Across <span className="india-text"><span className="top">IN</span><span className="middle">D</span><span className="bottom">IA</span></span>
</h1>


            <h3>Updated every 20 seconds</h3>
            {loading && (
                <div className="loading-dialog">
                    <div className="loading-content">
                        <h2>{loadingText}</h2>
                    </div>
                </div>
            )}

            <div className="weather-card-container">
                {weatherData.map((weather, index) => (
                    <WeatherCard
                        key={index}
                        weather={weather}
                        onAcknowledgeAlert={() => handleAcknowledgeAlert(weather.city)}
                    />
                ))}
            </div>

            {showAlertDialog && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <h2>Create Temperature Alert</h2>
                        <div>
                            <label>City:</label>
                            <select
                                value={alertConfig.selectedCity}
                                onChange={(e) =>
                                    setAlertConfig((prev) => ({ ...prev, selectedCity: e.target.value }))
                                }
                            >
                                {cities.map((city, index) => (
                                    <option key={index} value={city.city}>
                                        {city.city}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label>Condition:</label>
                            <select
                                value={alertConfig.condition}
                                onChange={(e) =>
                                    setAlertConfig((prev) => ({ ...prev, condition: e.target.value }))
                                }
                            >
                                <option value="increase">Increase</option>
                                <option value="decrease">Decrease</option>
                            </select>
                        </div>
                        <div>
                            <label>Threshold Temperature:</label>
                            <input
                                type="number"
                                value={alertConfig.thresholdTemp}
                                onChange={(e) =>
                                    setAlertConfig((prev) => ({ ...prev, thresholdTemp: parseFloat(e.target.value) }))
                                }
                            />
                        </div>
                        <div className="dialog-buttons">
                            <button onClick={handleCreateAlert}>Create Alert</button>
                            <button onClick={() => setShowAlertDialog(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default WeatherPage;
