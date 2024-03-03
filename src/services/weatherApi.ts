//So i need to return the lat & lon from the geoFetch function & pass that to the
//Weather api to finally get all of the weather data
import { geoLocation } from "./geoCodingApi";
import { geoFetch, GEO_API_HEAD } from "./geoCodingApi.ts";
import * as Wtr from "../Interfaces/WeatherData.ts";
import constants from "./constants.ts";

const WD_API_HEAD = (lat: number, lon: number): string =>
  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${constants.API_KEY}`;

//The purpose of this module should be to retrieve weather data based on a city name -> pretty straight foward.

//tester function so far
const fetchWeatherData = async (cityName: string): Promise<Wtr.WeatherData> => {
  try {
    //grab lon & lat from res
    const res: geoLocation[] = await geoFetch(GEO_API_HEAD(cityName));

    //For now let's fetch just the first element in the array
    //In the real app user should have the ability to choose among the matches
    const data = res[0];

    const newRes = await fetch(WD_API_HEAD(data.lat, data.lon));
    const newData: Wtr.WeatherData = await newRes.json();
    console.log(newData);
    return newData as Wtr.WeatherData;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { fetchWeatherData };
