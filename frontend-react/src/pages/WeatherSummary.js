import React, { useEffect, useState } from 'react';
import { fetchWeatherSummary } from '../services/weatherService';

function WeatherSummary() {
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSummary = async () => {
            try {
                const data = await fetchWeatherSummary();
                setSummary(data);
            } catch (error) {
                console.error('Error fetching weather summary:', error);
            } finally {
                setLoading(false);
            }
        };
        getSummary();
    }, []);

    if (loading) return <p>Loading...</p>;

    if (!summary) return <p>No weather summary available.</p>;

    return (
        <div className="weather-summary">
            <h2>Today's Weather Summary</h2>
            <p>City: {summary.city}</p>
            <p>Average Temperature: {summary.avg_temp}°C</p>
            <p>Maximum Temperature: {summary.max_temp}°C</p>
            <p>Minimum Temperature: {summary.min_temp}°C</p>
            <p>Dominant Weather Condition: {summary.dominant_condition}</p>
        </div>
    );
}

export default WeatherSummary;
