import React, { useEffect, useState } from 'react';
import { fetchWeatherAlerts } from '../services/weatherService';

function WeatherAlerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getAlerts = async () => {
            try {
                const data = await fetchWeatherAlerts();
                setAlerts(data);
            } catch (error) {
                console.error('Error fetching weather alerts:', error);
            } finally {
                setLoading(false);
            }
        };
        getAlerts();
    }, []);

    if (loading) return <p>Loading alerts...</p>;

    return (
        <div className="weather-alerts">
            <h2>Active Weather Alerts</h2>
            {alerts.length === 0 ? (
                <p>No active alerts.</p>
            ) : (
                <ul>
                    {alerts.map((alert, index) => (
                        <li key={index}>{alert.message}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default WeatherAlerts;
