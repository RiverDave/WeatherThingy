import constants from "./constants.ts";

//😆
//So we need to define the type of interface(obj) which defines the type of the data that we get
//that we're gonna return so we need to define the interface
// It is great since we get type checking and we know exactly with what kind of data we're dealing with in our response

interface geoLocation {
  name: string;
  local_names: string[];
  lat: number;
  lon: number;
  country: string;
  state: string;
}

//There are multiple ways of get lat & long values from this api
//Coordinating by city name:
//In the real app user should have the ability to choose among the cities
//found
const geoFetch = async (prefix: string): Promise<geoLocation[]> => {
  try {
    const res = await fetch(prefix);
    const data: geoLocation[] = await res.json();
    return data as geoLocation[]; //or simply return data, but it looks better as it is
  } catch (err) {
    console.error(err);
    //It is necessary to specify all return paths.
    return Promise.reject(err);
  }
};

//User should somehow be able to change the fields in here, except for the
//Api_key of course
// const GEO_PREFIX_URL : string = `http://api.openweathermap.org/geo/1.0/direct?q=${constants.CITY_NAME}&limit=${constants.SEARCH_LIMIT}&appid=${constants.API_KEY}`;

const GEO_API_HEAD = (city: string, limit = 10): string =>
  `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${constants.API_KEY}`;

export type { geoLocation };
export { geoFetch, GEO_API_HEAD };
