import React from "react";
import "./styles.css";
import Weather from "./components/Wheather.jsx"
import { Provider } from "react-redux";
import WeatherStore from "./redux/Store";
const App = () => {
  return (
    <Provider store={WeatherStore}>
      <div className="App">
        <Weather />
      </div>
    </Provider>
  );
};

export default App;