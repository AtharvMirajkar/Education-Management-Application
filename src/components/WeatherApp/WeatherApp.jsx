import React, { useState, useEffect } from "react";
import WeatherDisplay from "./WeatherDisplay";
import { Button, Spinner } from "reactstrap";

const WeatherApp = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const API_KEY = "e4b85fb6a32846289c7be5ecc175cd50";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=Kolhapur&appid=${API_KEY}&units=metric`
        );
        const data = await response.json();

        setWeatherData({
          city: data.name,
          temperature: data.main.temp,
          conditions: data.weather[0].main,
          windSpeed: data.wind.speed,
          humidity: data.main.humidity,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset,
        });
        setLoading(false);
      } catch (error) {
        setError("Error fetching weather data. Please try again later.");
        setLoading(false);
        console.error("Error fetching weather data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container d-flex justify-content-center align-items-center flex-column min-vh-100">
      <h1 className="mb-5">Weather App</h1>
      {loading && (
        <Button color="primary" disabled>
          <Spinner size="sm">Loading...</Spinner>
          <span> Loading</span>
        </Button>
      )}
      {error && <p>{error}</p>}
      {weatherData && <WeatherDisplay data={weatherData} />}
    </div>
  );
};

export default WeatherApp;
