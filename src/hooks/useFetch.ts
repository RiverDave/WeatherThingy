import React, { useState, useEffect } from "react";
import { fetchWeatherData } from "../services/weatherApi.ts";
import { WeatherData } from "../Interfaces/WeatherData.ts";

//TODO: Add error state to be rendered in the components in case there's an issue in the api call
const useFetch = (userInput: string): [WeatherData | undefined, boolean] => {
  const [data, setData] = useState<WeatherData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res: WeatherData = await fetchWeatherData(userInput);

        if (!res) {
          throw new Error("Data fetched is undefined");
        } else {
          setData(res);
        }
      } catch (err) {
        console.error("Error in  -> " + err);
      } finally {
        setIsLoading(false);
      }
    };

    if (userInput) {
      fetchData();
    }
  }, [userInput]);

  return [data, isLoading];
};

export default useFetch;
