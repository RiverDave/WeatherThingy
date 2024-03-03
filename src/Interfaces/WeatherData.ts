//Used within Currently && Hourly
interface WeatherInfo {
  id: number;
  main: string;
  description: string;
  icon: string;
}

interface CurrentWeatherData {
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
  weather: WeatherInfo[];
}

interface MinutelyWeatherData {
  dt: number;
  precipitation: number;
}

//Same as CurrentWeatherData, too much duplicate
interface Rain {
  //Fourtanetly JS allows us to name properties with string literals
  "1h": number;
}
interface HourlyWeatherData {
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
  weather: WeatherInfo[];
  pop: number;
  rain?: Rain;
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
  wind_gust: number;
  weather: WeatherInfo[];
  clouds: number;
  pop: number;
  rain: number;
  uvi: number;
}

interface WeatherData {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: CurrentWeatherData;
  minutely: MinutelyWeatherData[];
  hourly: HourlyWeatherData[];
  daily: DailyWeatherData[];
}

export type {
  WeatherData,
  CurrentWeatherData,
  MinutelyWeatherData,
  HourlyWeatherData,
  DailyWeatherData,
  WeatherInfo,
};
