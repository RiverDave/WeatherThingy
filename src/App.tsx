import React, { useState, useEffect } from "react";
import useFetch from "./hooks/useFetch";
import "./App.css";
import { WeatherData } from "./Interfaces/WeatherData";

//TODO: Abstract the api code & find a way to be able to pass all of the data
//fetched from the api into our components: This will be done with a Custom Hook.

function App() {
  //To be recorded in a field somewhere.
  // const [userQuery, setUserQuery] = useState<string | undefined>(undefined);

  const [currentWeatherData, setCurrentWeatherData] = useState<
    WeatherData | undefined
  >(undefined);

  const [data, isLoading] = useFetch("Montreal");

  useEffect(() => {
    if (data && !isLoading) {
      setCurrentWeatherData(data);
    } else {
      console.log("no data fetched");
    }

    return () => {};
  }, [data]);

  //test values below:
  return (
    <main className="main-app">
      <h1>TS WA</h1>
      {currentWeatherData && <h1>{currentWeatherData?.current.temp}</h1>}
    </main>
  );
}
export default App;
