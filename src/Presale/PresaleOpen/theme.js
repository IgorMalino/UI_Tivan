import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#f50057",
    },
    text: {
      primary: "#00CCFF",
      secondary: "#FFFFFF",
      disabled: "#FFFFFF",
    },
  },
  components: {
    MuiLoadingButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            border: "1px solid #d32f2f",
          },
        },
        loading: {
          backgroundColor: "#d32f2f",
        },
        loadingIndicator: {
          color: "#d32f2f",
        },
      },
    },
  },
});

export default theme;
