import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faThermometerHalf,
  faWind,
  faTint,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const WeatherDisplay = ({ data }) => {
  // Function to convert Unix timestamp to local time string
  const unixTimestampToLocalTimeString = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleTimeString();
  };

  return (
    <div className="container mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-4 mb-4 mb-md-0">
          <img
            src="https://img.freepik.com/free-vector/weather-concept-illustration_114360-1234.jpg?w=826&t=st=1715939101~exp=1715939701~hmac=3ee79767cb42c9b1159a3b6895b930b4530296bc30a5291460534db8a60af526"
            alt="Weather Illustration"
            className="img-fluid"
          />
        </div>
        <div className="col-md-8 col-lg-6">
          <div className="card">
            <div className="card-header bg-primary text-white">
              <h2 className="card-title mb-0 h3">Weather in {data.city}</h2>
            </div>
            <div className="card-body">
              <div className="row mt-3">
                <div className="col-md-6 mb-2">
                  <h4>
                    <FontAwesomeIcon icon={faThermometerHalf} /> Temperature
                  </h4>
                  <p>{data.temperature}°C</p>
                </div>
                <div className="col-md-6 mb-2">
                  <h4>
                    <FontAwesomeIcon icon={faSun} /> Conditions
                  </h4>
                  <p>{data.conditions}</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6 mb-2">
                  <h4>
                    <FontAwesomeIcon icon={faWind} /> Wind Speed
                  </h4>
                  <p>{data.windSpeed} m/s</p>
                </div>
                <div className="col-md-6 mb-2">
                  <h4>
                    <FontAwesomeIcon icon={faTint} /> Humidity
                  </h4>
                  <p>{data.humidity}%</p>
                </div>
              </div>
              <div className="row mt-3">
                <div className="col-md-6 mb-2">
                  <h4>
                    <FontAwesomeIcon icon={faSun} /> Sunrise
                  </h4>
                  <p>
                    {data.sunrise
                      ? unixTimestampToLocalTimeString(data.sunrise)
                      : "N/A"}
                  </p>
                </div>
                <div className="col-md-6 mb-2">
                  <h4>
                    <FontAwesomeIcon icon={faMoon} /> Sunset
                  </h4>
                  <p>
                    {data.sunset
                      ? unixTimestampToLocalTimeString(data.sunset)
                      : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
