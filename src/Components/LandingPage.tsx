import {
  Autocomplete,
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { MatchesData } from "../services/weatherApi";
import { useState } from "react";

type LandingPageProps = {
  matchesFound: MatchesData[] | undefined;
  setUserInput: React.Dispatch<React.SetStateAction<string>>; //setState
};

function LandingPage({ matchesFound, setUserInput }: LandingPageProps) {
  const [textField, setTextField] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<MatchesData | null>(
    null
  );

  //Api changes(functor callback in this case) will execute once in the span set below (ms)
  const debounce = (func: Function, delay: number) => {
    let timer: ReturnType<typeof setTimeout>;
    return function (this: any, ...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    };
  };

  const handleInputChange = (newValue: string) => {
    setTextField(newValue);
    setUserInput(newValue);
  };

  const debounceHandleInputChange = debounce(handleInputChange, 900);

  return (
    <Stack maxWidth={"lg"}>
      <Autocomplete
        id="weather_match_demo"
        options={matchesFound || []}
        getOptionLabel={(match) => match.geoData?.name || ""}
        isOptionEqualToValue={
          (option, value) => option.geoData?.name === value.geoData?.name
          //TODO: Implement search by coordinate | zip code?
          // ||
          // (option.geoData?.lon === value.geoData?.lon &&
          //   option.geoData?.lat === value.geoData?.lat)
        }
        onChange={(event, newValue) => {
          //New value type inferred from options
          setTextField(newValue?.geoData?.name || "");
          setSelectedOption(newValue);
        }}
        renderOption={(props, matchesFound) => (
          <Box component="li" {...props} key={matchesFound.id}>
            <Typography variant="h3">{matchesFound.geoData?.name}</Typography>
            <Typography variant="body1">
              {matchesFound.geoData?.state} - {matchesFound.geoData?.country}
            </Typography>
          </Box>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            variant="outlined"
            onChange={(e) => {
              debounceHandleInputChange(e.target.value);
            }}
            value={selectedOption?.weatherData}
          />
        )}
        // noOptionsText={"NO MATCHES FOUND!"}
      />

      <Box
        display={"flex"}
        marginTop={"100px"}
        alignContent={"center"}
        justifyContent={"center"}
      >
        <h1>
          {selectedOption && selectedOption.geoData?.name} -{" "}
          {selectedOption && selectedOption.weatherData?.current.temp}
        </h1>
      </Box>
    </Stack>
  );
}

export default LandingPage;
