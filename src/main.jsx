/* eslint-disable react/react-in-jsx-scope */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    body1: {
      fontFamily: "'Hachi Maru Pop', cursive", // body1にHachi Maru Popを適用
    },
    body2: {
      fontFamily: "Noto Sans JP",
    },
    h1: {
      fontFamily: "Kaisei Decol, curive",
      fontWeight: "bold",
    },
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
