import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import App from "./App.tsx";
import "./index.css";

//TODO: Figure out How to handle themes, since looks really annoying!!!
// const theme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#fff",
//     },
//     secondary: {
//       main: "#0000FF",
//     },
//   },
// });

//Material UI stuff
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
