import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "../services/weatherApi.ts";
import { WeatherData } from "../Interfaces/WeatherData.ts";
import { GeoLocation } from "../services/geoCodingApi.ts";

//TODO: Add error state to be rendered in the components in case there's an issue in the api call
//TODO: Sketch Page design
const useFetch = (
  userInput: string
): [WeatherData | undefined, GeoLocation | undefined, boolean] => {
  const [data, setData] = useState<WeatherData | undefined>(undefined);
  const [cityData, setCityData] = useState<GeoLocation>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const { weatherData: res, geoData: cityData } = await fetchWeatherData(
          userInput
        );

        if (!res) {
          throw new Error("Data fetched is undefined");
        } else {
          setData(res);
          setCityData(cityData);
        }
      } catch (err) {
        console.error("Error in  -> " + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userInput]);

  return [data, cityData, isLoading];
};

export default useFetch;
