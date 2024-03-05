//Used within Currently && Hourly
interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface BaseWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: number;
  feels_like: number;
  pressure: number;
  humidity: number;
  dew_point: number;
  uvi: number;
  clouds: number;
  visibility: number;
  wind_speed: number;
  wind_deg: number;
  weather: Array<WeatherData>;
  rain?: Rain;
  snow?: Snow;
}

interface CurrentWeatherData extends BaseWeatherData {}

interface MinutelyWeatherData {
  dt: number;
  precipitation: number;
}

interface Rain {
  //Fourtanetly JS allows us to name properties with string literals
  "1h": number;
}

interface Snow {
  //Fourtanetly JS allows us to name properties with string literals
  "1h": number;
}

interface HourlyWeatherData extends BaseWeatherData {
  wind_gust?: number;
  pop: number;
}

//Daily types:

interface Temp {
  day: number;
  min: number;
  max: number;
  night: number;
  eve: number;
  morn: number;
}

interface FeelsLike {
  day: number;
  night: number;
  eve: number;
  morn: number;
}

//Normally 8 days
//TODO: Could this be extended with BaseWeatherData??
interface DailyWeatherData {
  dt: number;
  sunrise: number;
  sunset: number;
  moonrise: number;
  moonset: number;
  moon_phase: number;
  summary: string;
  temp: Temp;
  feels_like: FeelsLike;
  pressure: number;
  humidity: number;
  dew_point: number;
  wind_speed: number;
  wind_deg: number;
  wind_gust?: number;
  weather: Array<WeatherInfo>;
  clouds: number;
  pop: number;
  rain?: number;
  uvi: number;
}

interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeatherData;
  minutely: Array<MinutelyWeatherData>;
  hourly: Array<HourlyWeatherData>;
  daily: Array<DailyWeatherData>;
}

export type {
  WeatherData,
  CurrentWeatherData,
  MinutelyWeatherData,
  HourlyWeatherData,
  DailyWeatherData,
  WeatherInfo,
};
