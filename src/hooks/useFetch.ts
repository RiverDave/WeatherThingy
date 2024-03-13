import { useEffect, useState } from "react";
import { fetchWeatherData, MatchesData } from "../services/weatherApi.ts";

//TODO: Add error state to be rendered in the components in case there's an issue in the api call
//TODO: Sketch Page design
const useFetch = (userInput: string): [MatchesData[] | undefined, boolean] => {
  const [weatherInfo, setWeatherInfo] = useState<MatchesData[] | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const matchesData: MatchesData[] | undefined = await fetchWeatherData(
          userInput
        );

        if (!matchesData) {
          throw new Error("Data fetched is undefined");
        } else {
          //filter in case of duplicate keys(ids)
          const filteredMatches: MatchesData[] = matchesData.filter(
            (value, index, self) => {
              return self.indexOf(value) === index;
            }
          );
          setWeatherInfo(filteredMatches);
        }
      } catch (err) {
        console.error("Error in  -> " + err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [userInput]);

  return [weatherInfo, isLoading];
};

export default useFetch;
