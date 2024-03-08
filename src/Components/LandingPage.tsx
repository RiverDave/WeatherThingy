import { Box, Button, Container, TextField, Typography } from "@mui/material";
import * as React from "react";
import { MatchesData } from "../services/weatherApi";
import { useState } from "react";

type LandingPageProps = {
  matchesFound : MatchesData | undefined;
  setUserInput: React.Dispatch<React.SetStateAction<string>>; //setState
};

function LandingPage(
  { matchesFound , setUserInput }: LandingPageProps,
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
          {matchesFound?.geoData.name} - {matchesFound?.geoData.state} - {matchesFound?.geoData.country}
        </Typography>

        <Typography
          variant="h3"
          alignContent={"center"}
          display={"flex"}
          justifyContent={"center"}
        >
          Temp: {matchesFound?.weatherData.current.temp}° Feels like:{" "}
          {matchesFound?.weatherData.current.feels_like}
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
