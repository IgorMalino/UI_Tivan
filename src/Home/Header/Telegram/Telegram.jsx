import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ReactCountryFlag from "react-country-flag";

import "./styles.css";

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
    MuiPaper: {
      styleOverrides: {
        root: {
          top: 46,
          background: "transparent",
        },
      },
    },
    MuiList: {
      styleOverrides: {
        root: {
          background: "transparent",
          borderTop: 1,
          borderBottom: 1,
          borderLeft: 0,
          borderRight: 0,
          borderStyle: "solid",
        },
      },
    },
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

const Telegram = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  return (
    <div id="social">
      <a
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="social-icon"
        target="_blank"
        href="http://t.me/TIVAN_ENG"
      >
        <i style={{ fontSize: "19px" }} className="telegram plane icon"></i>
      </a>

      <ThemeProvider theme={theme}>
        <Menu
          style={{ marginTop: "7px" }}
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <li className="icocu">
            <a
              target="_blank"
              href="http://t.me/TIVAN_ENG"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faTelegram} />
              &nbsp;
              <ReactCountryFlag countryCode="US" /> ENG
            </a>
          </li>
          <li className="icocu">
            <a
              target="_blank"
              href="http://t.me/TIVAN_RUS"
              onClick={handleClose}
            >
              <FontAwesomeIcon icon={faTelegram} />
              &nbsp;
              <ReactCountryFlag countryCode="RU" /> RUS
            </a>
          </li>
        </Menu>
      </ThemeProvider>
    </div>
  );
};

export default Telegram;
