const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'weatherapp',
  port: 3306 
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to the database:', err);
  } else {
    console.log('Connected to MySQL database');
    connection.release();
  }
});

app.post('/api/weather', (req, res) => {
  const { date, cityname, temp, weather, min_temp, max_temp, pressure, humidity, windspeed } = req.body;

  console.log(`Received weather data from frontend for city: ${cityname} on ${date}`);

  const query = `
    INSERT INTO weather_data (date, cityname, temp, weather, min_temp, max_temp, pressure, humidity, windspeed) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [date, cityname, temp, weather, min_temp, max_temp, pressure, humidity, windspeed];

  pool.execute(query, values, (error, results) => {
    if (error) {
      console.error('Error inserting data into database:', error);
      return res.status(500).json({ message: 'Error inserting weather data' });
    }

    console.log(`Successfully inserted weather data for ${cityname} on ${date} into the database`);

    res.status(201).json({ message: 'Weather data inserted successfully' });
  });
});

app.get('/api/weather', (req, res) => {
  console.log('Received request from frontend to fetch weather data');

  const query = 'SELECT * FROM weather_data ORDER BY date DESC';

  console.log('Requesting weather data from the database...');
  
  pool.execute(query, (error, results) => {
    if (error) {
      console.error('Error fetching weather data:', error);
      return res.status(500).json({ message: 'Error fetching weather data' });
    }

    console.log('Successfully fetched weather data from the database');

    console.log('Sending weather data back to the frontend');

    res.status(200).json(results);
  });
});

app.listen(5000, () => {
  console.log('Server is running on http://localhost:5000');
});
