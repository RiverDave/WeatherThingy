import { useState, useEffect } from "react";
import "./App.css";

import { fetchWeatherData } from "./services/weatherApi.ts";

fetchWeatherData("Miami");

function App() {
  return (
    <main className="main-app">
      <h1>TS WA</h1>
    </main>
  );
}
export default App;
