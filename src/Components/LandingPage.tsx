import { Box, Typography } from "@mui/material";
import { GeoLocation } from "../services/geoCodingApi";
import { WeatherData } from "../Interfaces/WeatherData";

type LandingPageProps = {
  cityDetails: GeoLocation | undefined;
  weatherInfo: WeatherData | undefined;
};

function LandingPage({ cityDetails, weatherInfo }: LandingPageProps) {
  return (
    <Box display={"flex"} flexDirection={"column"}>
      <Typography
        variant="h1"
        alignContent={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        Weather Stuff WIP
      </Typography>

      <Typography
        variant="h2"
        alignContent={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        {cityDetails?.name} - {cityDetails?.state} - {cityDetails?.country}
      </Typography>

      <Typography
        variant="h3"
        alignContent={"center"}
        display={"flex"}
        justifyContent={"center"}
      >
        {weatherInfo?.current.temp}°
      </Typography>
    </Box>
  );
}

export default LandingPage;
