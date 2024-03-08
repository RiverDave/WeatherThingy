import { Box, Button, Container, TextField, Typography } from "@mui/material";
import * as React from "react";
import { GeoLocation } from "../services/geoCodingApi";
import { WeatherData } from "../Interfaces/WeatherData";
import { useState } from "react";

type LandingPageProps = {
  cityDetails: GeoLocation | undefined;
  weatherInfo: WeatherData | undefined;
  setUserInput: React.Dispatch<React.SetStateAction<string>>; //setState
};

function LandingPage(
  { cityDetails, weatherInfo, setUserInput }: LandingPageProps,
) {
  const [value, setValue] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleClick = () => {
    setUserInput(value);
  };

  return (
    <Container maxWidth="lg">
      <Box>
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
          Temp: {weatherInfo?.current.temp}° Feels like:{" "}
          {weatherInfo?.current.feels_like}
        </Typography>

        <Box
          marginTop={"30vh"}
          display={"flex"}
          alignContent={"center"}
          justifyContent={"center"}
          component={"form"}
          noValidate
          autoComplete="off"
        >
          <TextField
            className="land-input"
            id="outlined-basic"
            label="filled"
            variant="filled"
            value={value}
            onChange={handleChange}
          />
          <Button onClick={handleClick}>Search</Button>
        </Box>
      </Box>
    </Container>
  );
}

export default LandingPage;
