import constants from "./constants.ts";

//😆
//So we need to define the type of interface(obj) which defines the type of the data(schema?) that we get
//that we're gonna return so we need to define the interface
// **It is great since we get type checking and we know exactly with what kind of data we're dealing with in our response

interface GeoLocation {
  name: string;
  local_names: string[];
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

//There are multiple ways of get lat & long values from this api
//Coordinating by city name:
//**In the real app user should have the ability to choose among the cities
//found
const geoFetch = async (prefix: string): Promise<GeoLocation[]> => {
  try {
    const res = await fetch(prefix);
    const data: GeoLocation[] = await res.json();

    //In some cases despite there being no errors in the response, when one tries fetch a random name
    //the data retrieved comes in form of an array with length 0
    if (!res || data.length === 0) {
      throw new Error("Data retrieved is undefined");
    }

    return data as GeoLocation[];
  } catch (err) {
    console.error(err);
    return Promise.reject(err);
  }
};

const GEO_API_HEAD = (city: string, limit = 10): string =>
  `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${constants.API_KEY}`;

export type { GeoLocation as GeoLocation };
export { geoFetch, GEO_API_HEAD };
