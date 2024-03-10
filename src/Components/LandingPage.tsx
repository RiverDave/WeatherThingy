import { Box, Button, Container, TextField, Typography } from "@mui/material";
import * as React from "react";
import { MatchesData } from "../services/weatherApi";
import { useState } from "react";

type LandingPageProps = {
  matchesFound: MatchesData[] | undefined;
  setUserInput: React.Dispatch<React.SetStateAction<string>>; //setState
};

function LandingPage(
  { matchesFound, setUserInput }: LandingPageProps,
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

        {matchesFound && matchesFound.map((match) => {
          return (
            <Box flexDirection={"row"}>
              <Typography
                variant="h2"
                alignContent={"center"}
                display={"flex"}
                justifyContent={"center"}
              >
                {match && match.geoData?.name} - {match && match.geoData?.state}
                {" "}
                - {match && match.geoData?.country}
              </Typography>



              <Typography
                variant="h2"
                alignContent={"center"}
                display={"flex"}
                justifyContent={"center"}
              >
                {match && match.weatherData?.current.temp}° - {match && match.weatherData?.current.feels_like}
              </Typography>

            </Box>
          );
        })}


      </Box>
    </Container>
  );
}

export default LandingPage;
