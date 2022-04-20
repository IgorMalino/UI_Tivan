import React, { useState } from "react";

// importing Css styles
import "./Language.css";

// Material UI elements
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import Fade from "@mui/material/Fade";

// import Country flag
import ReactCountryFlag from "react-country-flag";

import i18n from "i18next";
import { useLocation, useNavigate } from "react-router-dom";

const ChooseLanguage = () => {
  const [selected, setSelected] = useState(i18n.language);

  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClose = (e) => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

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

  const onChange = (event) => {
    i18n.changeLanguage(event.target.getAttribute("data"));
    console.log(location.pathname, event.target.value);
    if (location.pathname.split(`/${i18n.language}`)[1]) {
      const newPathname = [
        "/",
        i18n.language,
        ...location.pathname.split(`/${i18n.language}`)[1],
      ];
      console.log(newPathname, "navbar IF");
      navigate(newPathname.join(""));
      setSelected(i18n.language);
    } else {
      const newPathname = `/${i18n.language}`;
      console.log(newPathname, "navbar else");
      navigate(newPathname);
      setSelected(i18n.language);
    }
    handleClose();
  };

  return (
    <>
      <div id="language">
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
          {console.log(i18n.language)}
          <ReactCountryFlag
            style={{ fontSize: "17px" }}
            countryCode={i18n.language === "en" ? "US" : "RU"}
          />
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
            <li onClick={(e) => onChange(e)} className="icocu">
              <a data="en">
                <ReactCountryFlag data="en" countryCode="US" />
                ENG
              </a>
            </li>
            <li onClick={(e) => onChange(e)} className="icocu">
              <a data="ru">
                <ReactCountryFlag data="ru" countryCode="RU" />
                RUS
              </a>
            </li>
          </Menu>
        </ThemeProvider>
      </div>
    </>
  );
};

export default ChooseLanguage;
