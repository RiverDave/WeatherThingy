//- The purpose of this module should be to retrieve weather data based lat & lon values
//retrieved in the geoCoding Api
import { GeoLocation } from "./geoCodingApi";
import { geoFetch } from "./geoCodingApi.ts";
import { WeatherData } from "../Interfaces/WeatherData.ts";
import constants from "./constants.ts";

const GEO_API_HEAD = (city: string, limit = 10): string =>
  `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${constants.API_KEY}`;
const WD_API_HEAD = (lat: number, lon: number, units = "metric"): string =>
  `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&units=${units}&appid=${constants.API_KEY}`;
const GEO_API_HEAD_REVERSE = (
  lat: number,
  lon: number,
  units = "metric",
): string =>
  `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&units=${units}&appid=${constants.API_KEY}`;

const fetchCurrentLocation = (): Promise<{ lat: number; lon: number }> => {
  return new Promise((resolve, reject) => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const localLat = position.coords.latitude;
          const localLong = position.coords.longitude;

          if (!localLat || !localLat) {
            reject(new Error("Geolocation Coordinates are undefined."));
          }

          resolve({ lat: localLat, lon: localLong });
        },
        (error) => {
          console.error(error);
          reject(error);
        },
      );
    } else {
      reject(new Error("Geolocation is not supported by this browser."));
    }
  });
};

//returns : city details and weather information
export interface MatchesData {
  weatherData: WeatherData | null;
  geoData: GeoLocation | null;
}

const fetchWeatherData = async (
  cityName: string,
): Promise<MatchesData[]> => {
  console.log("Fetching with " + cityName);

  try {
    //get coordenates by either:
    //1. City input != null -> Fetching coordinates with cityname -> Getting cityDetails through the GeoLocation header defined above
    //2. Fetching current location coordenates -> Getting cityDetails through the reverse header defined above

    let coordinates: { lat: number; lon: number };
    let data: MatchesData[] | null = [];

    if (!cityName) {
      const currPos = await fetchCurrentLocation();
      coordinates = { lat: currPos.lat, lon: currPos.lon };

      const res: GeoLocation[] = await geoFetch(
        GEO_API_HEAD_REVERSE(coordinates.lat, coordinates.lon),
      );

      data = await Promise.all(res.map(async (element) => {
        if (element) {
          const weatherResponse = await fetch(
            WD_API_HEAD(element.lat, element.lon),
          );

          const weatherData: WeatherData = await weatherResponse.json();

          const newElement: MatchesData = {
            weatherData: weatherData,
            geoData: element,
          };

          return newElement;
        }

        //null obj
        return {
          weatherData: null,
          geoData: null,
        };
      }));
    } else {

      const res: GeoLocation[] = await geoFetch(GEO_API_HEAD(cityName));
      data = await Promise.all(res.map(async (element) => {
        if (element) {
          const weatherResponse = await fetch(
            WD_API_HEAD(element.lat, element.lon),
          );
          const weatherData: WeatherData = await weatherResponse.json();

          const newElement: MatchesData = {
            weatherData: weatherData,
            geoData: element,
          };

          return newElement;
        }

        return {
          weatherData: null,
          geoData: null,
        };
      }));
    }

    //this logs undefined
    return data as MatchesData[];
  } catch (err) {
    console.error("Rejection -> " + err);
    return Promise.reject(err);
  }
};

export { fetchWeatherData };
