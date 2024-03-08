import React, { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import "./App.css";
import LandingPage from "./Components/LandingPage";

function App() {
  // const [currentWeatherData, setCurrentWeatherData] = useState<
  //   WeatherData | undefined
  // >(undefined);

  const [userInput, setUserInput] = React.useState<string>(""); //User input for city name
  const [weatherData, cityData, isLoading] = useFetch(userInput); //Only user input(for now), if empty -> use current location

  useEffect(() => {
    if (weatherData && !isLoading) {
    } else {
      console.log("no data fetched");
    }

    return () => {};
  }, [weatherData]);

  //TODO: Weather data shall be passed onto components below.?? figure that out
  return (
    <main className="app-main">
      <LandingPage cityDetails={cityData} weatherInfo={weatherData} setUserInput={setUserInput}  />
    </main>
  );
}
export default App;
