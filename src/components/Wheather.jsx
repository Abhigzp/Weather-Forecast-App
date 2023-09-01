import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetWeatherDetails } from "../redux/Actions";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import moment from "moment";

const Weather = () => {
  const dispatch = useDispatch();
  const weatherData = useSelector((state) => state);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(GetWeatherDetails());
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchInput) dispatch(GetWeatherDetails(searchInput));
    setSearchInput("");
  };

  const handleOnChange = (e) => {
    setSearchInput(e.target.value);
  };

  const { data, success } = weatherData;
  const { weather, sys, name, main } = data;

  return (
    <>
      <div className="container">
        <div className="heading">Weather Forecast App </div>
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search Weather by City"
            value={searchInput}
            onChange={handleOnChange}
          />
          <button>Find</button>
        </form>
        <div className="helper-text">Type City Name and Hit Enter</div>
        <div className="info">
          <div className="sub-heading">
            Weather Forecast <div>on</div>
          </div>
          <small className="date">
            {success ? moment().format("MMM DD YYYY") : null}
          </small>
          <div className="location">
            {success ? name : null}
            <small>({success ? sys.country : null})</small>
          </div>
          <div className="forecast-info">
            <div className="forecast-icon">
              {success ? (
                <img
                  src={`http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`}
                  alt=""
                />
              ) : null}
            </div>
            <div className="forecast-value">
              <div className="degrees">
                <span className="degrees-count">
                  {success ? main.temp : null}
                </span>
                C
              </div>
              <span className="weather-condition">
                {success ? weather[0].main : null}
              </span>
            </div>
          </div>
          <div className="additional-info">
            <ul className="list">
              <li>
                <b>Feels Like</b> {success ? main.feels_like : null}
              </li>
              <li>
                <b>Min Temp</b> {success ? main.temp_min : null}
              </li>
              <li>
                <b>Max Temp</b> {success ? main.temp_max : null}
              </li>
              <li>
                <b>Pressure</b> {success ? main.pressure : null}
              </li>
              <li>
                <b>Humidity</b> {success ? main.humidity : null}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Weather;