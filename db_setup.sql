CREATE DATABASE weatherapp;

USE weatherapp;

CREATE TABLE weather_data (
    id INT NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    cityname VARCHAR(50) NOT NULL,
    temp DECIMAL(5,2) NOT NULL,
    weather VARCHAR(100) NOT NULL,
    min_temp DECIMAL(5,2),
    max_temp DECIMAL(5,2),
    pressure INT,
    humidity INT,
    windspeed DECIMAL(5,2),
    PRIMARY KEY (id)
);
