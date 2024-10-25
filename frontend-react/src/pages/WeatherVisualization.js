import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { fetchHistoricalData } from '../services/weatherService';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function WeatherVisualization() {
    const [chartData, setChartData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getHistoricalData = async () => {
            try {
                const data = await fetchHistoricalData();
                const labels = data.map(entry => entry.date);  
                const temperatures = data.map(entry => entry.avg_temp);  

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Average Temperature (°C)',
                            data: temperatures,
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        }
                    ]
                });
            } catch (error) {
                console.error('Error fetching historical data:', error);
            } finally {
                setLoading(false);
            }
        };
        getHistoricalData();
    }, []);

    if (loading) return <p>Loading chart...</p>;

    return (
        <div className="weather-visualization">
            <h2>Historical Temperature Trends</h2>
            <Line data={chartData} options={{ responsive: true }} />
        </div>
    );
}

export default WeatherVisualization;
