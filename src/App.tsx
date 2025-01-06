import { CacheProvider } from "@emotion/react";
import {  CssBaseline, ThemeProvider } from "@mui/material";
import "./App.css";
import MainRoutes from "./routes";
import { cache, theme } from "./theme";

function App() {


  return (
    <>   

        <CacheProvider value={cache}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainRoutes />
          </ThemeProvider>
        </CacheProvider>
    </>
  );
}

export default App;
