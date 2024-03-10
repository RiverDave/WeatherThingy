import React, { useEffect } from "react";
import useFetch from "./hooks/useFetch";
import "./App.css";
import LandingPage from "./Components/LandingPage";

function App() {
  // const [currentWeatherData, setCurrentWeatherData] = useState<
  //   WeatherData | undefined
  // >(undefined);

  const [userInput, setUserInput] = React.useState<string>("New York"); //User input for city name
  const [weatherInfo, isLoading] = useFetch(userInput); //Array of [weatherData, cityDetails]

  useEffect(() => {
    if (weatherInfo && !isLoading) {
    } else {
      console.log("no data fetched");
    }

    //NOTE: For now its returning the city name correctly but not the temp
    if (weatherInfo) {
      weatherInfo.forEach((element) => {
        if (element) {
          console.log('city name: ' + element.geoData?.name + 'Country: ' + element.geoData?.country);
          console.log('city temp: ' + JSON.stringify(element.weatherData?.current.temp));
        }
      });
    }

    return () => {};
  }, [weatherInfo]);

  //TODO: Weather data shall be passed onto components below.?? figure that out
  return (
    <main className="app-main">
      {/*TODO: Passing a setState is not a good practice, but it works for now.*/}
      <LandingPage matchesFound={weatherInfo} setUserInput={setUserInput}  />
    </main>
  );
}
export default App;
