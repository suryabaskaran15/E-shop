import { createTheme } from "@mui/material/styles";

// Define custom colors
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
    },
    secondary: {
      main: "#f50057", // Pink
    },
    background: {
      default: "#f4f6f8", // Light background for pages
    },
    text: {
      primary: "#212121", // Dark text for better readability
      secondary: "#757575", // Lighter text for secondary elements
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif", // Use Roboto as default font
    h1: {
      fontSize: "2rem", // Size for h1
      fontWeight: 500,
    },
    h2: {
      fontSize: "1.75rem", // Size for h2
      fontWeight: 500,
    },
    h3: {
      fontSize: "1.5rem", // Size for h3
      fontWeight: 400,
    },
    body1: {
      fontSize: "1rem", // Body text size
      fontWeight: 400,
    },
    button: {
      textTransform: "none", // Remove uppercase text for buttons
    },
  },
  spacing: 8, // Default spacing unit for margin/padding
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained", // Default button variant
        color: "primary", // Default button color
      },
      styleOverrides: {
        root: {
          borderRadius: 4, // Rounded corners for buttons
          padding: "8px 16px", // Padding inside buttons
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined", // Default text field style
        fullWidth: true, // Make text fields full width
      },
      styleOverrides: {
        root: {
          margin: "1px 0", // Margin for text fields
        },
      },
    },
  },
});

export default theme;
