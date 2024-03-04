//So i need to return the lat & lon from the geoFetch function & pass that to the
//Weather api to finally get all of the weather data
//- The purpose of this module should be to retrieve weather data based lat & lon values
//retrieved in the geoCoding Api
import { geoLocation } from "./geoCodingApi";
import { geoFetch, GEO_API_HEAD } from "./geoCodingApi.ts";
import { WeatherData } from "../Interfaces/WeatherData.ts";
import constants from "./constants.ts";

const WD_API_HEAD = (lat: number, lon: number, units = "metric"): string =>
  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${constants.API_KEY}`;

//FIXME: Refactor this function, since it looks messy???
const fetchWeatherData = async (cityName: string): Promise<WeatherData> => {
  try {
    const res: geoLocation[] = await geoFetch(GEO_API_HEAD(cityName));
    //Placeholder, will fetch more in the ftr
    const data = res[0];
    const weatherResponse = await fetch(WD_API_HEAD(data.lat, data.lon));
    const weatherData: WeatherData = await weatherResponse.json();
    return weatherData;
  } catch (err) {
    return Promise.reject(err);
  }
};

export { fetchWeatherData };
