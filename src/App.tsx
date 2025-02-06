import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import AppRoutes from "./routes/AppRoutes";
import theme from "./styles/theme";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { GlobalStyles } from "@mui/material";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        {/* Apply global styles */}
        <GlobalStyles
          styles={{
            "*": {
              margin: 0,
              padding: 0,
              boxSizing: "border-box", // Prevents box model issues
            },
            body: {
              height: "100%", // Ensure full height
            },
            "#root": {
              height: "100%", // Ensure full height for the root element
            },
          }}
        />
        <AppRoutes />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
