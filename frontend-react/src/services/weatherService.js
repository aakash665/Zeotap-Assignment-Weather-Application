import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/weather';  /

export const fetchWeatherSummary = async () => {
    const response = await axios.get(`${API_BASE_URL}/summary`);
    return response.data;
};

export const fetchWeatherAlerts = async () => {
    const response = await axios.get(`${API_BASE_URL}/alerts`);
    return response.data;
};

export const fetchHistoricalData = async () => {
    const response = await axios.get(`${API_BASE_URL}/history`);
    return response.data;
};
