import { useEffect, useState } from "react";

import "./WeatherApp.css";

import search from "./../assets/img/search.svg";

const WeatherApp = () => {
  const [location, setLocation] = useState("");
  const [locInfo, setLocInfo] = useState({});

  useEffect(() => {
    handleFetch();
  }, []);
  const handleFetch = () => {
    if (location) {
      fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=3162f5e64f8c49b8a1f185018231012&q=${location}&days=1&aqi=no&alerts=no`
      )
        .then((res) => res.json())
        .then((data) =>
          setLocInfo({
            name: data.location.name,
            country: data.location.country,
            current: data.current.temp_c,
            condition: data.current.condition.text,
            wind: data.current.wind_mph,
            humidity: data.current.humidity,
            feels: data.current.feelslike_c,
          })
        );
    }
    setLocation("");
  };
  console.log(locInfo);
  return (
    <div className="weatherApp">
      <div className="container">
        <div className="items">
          <div className="search">
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Enter location"
            />
            <button onClick={handleFetch}>
              <img src={search} alt="" />
            </button>
          </div>
          <div className="top">
            {locInfo.current && (
              <div className="temp">
                {" "}
                <h1>{locInfo.current}°C</h1>
              </div>
            )}
            {locInfo.condition && (
              <div className="condition">
                {" "}
                <p>{locInfo.condition}</p>
              </div>
            )}
            {locInfo.name && locInfo.country && (
              <div className="location">
                {" "}
                <p>
                  {locInfo.name}, {locInfo.country}
                </p>
              </div>
            )}
          </div>
          {locInfo.name != undefined && (
            <div className="bottom">
              <div className="feels">
                <h2>Feels like</h2>
                {locInfo.feels && <p>{locInfo.feels}°C</p>}
              </div>
              <div className="wind">
                <h2>Wind Speed</h2>
                {locInfo.wind && <p>{locInfo.wind} MPH</p>}
              </div>
              <div className="humidity">
                <h2>Humidity</h2>
                {locInfo.humidity && <p>{locInfo.humidity}%</p>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
