import React, { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import "./App.css";
import LandingPage from "./Components/LandingPage";

//TODO: Abstract the api code & find a way to be able to pass all of the data
//fetched from the api into our components: This will be done with a Custom Hook.

function App() {
  // const [currentWeatherData, setCurrentWeatherData] = useState<
  //   WeatherData | undefined
  // >(undefined);

  const [weatherData, cityData, isLoading] = useFetch("Manitoba"); //Only user input(for now)

  useEffect(() => {
    if (weatherData && !isLoading) {
      console.log("Fetch was successful");
    } else {
      console.log("no data fetched");
    }

    return () => {};
  }, [weatherData]);

  //TODO: Weather data shall be passed onto components below.?? figure that out
  return (
    <main className="app-main">
      <LandingPage cityDetails={cityData} weatherInfo={weatherData} />
    </main>
  );
}
export default App;
