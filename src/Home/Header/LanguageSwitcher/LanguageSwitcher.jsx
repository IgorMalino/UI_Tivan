import React, { useState } from "react";
import i18n from "i18next";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import ReactCountryFlag from "react-country-flag";
import { useLocation, useNavigate } from "react-router-dom";

import theme from "../theme";

import "./styles.css";

const LanguageSwitcher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const close = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };

  const changeLanguage = (language) => () => {
    i18n.changeLanguage(language);

    const pathname = location.pathname.split(`/${i18n.language}`)[1]
      ? [
          "/",
          i18n.language,
          ...location.pathname.split(`/${i18n.language}`)[1],
        ].join("")
      : `/${i18n.language}`;

    navigate(pathname);

    close();
  };

  return (
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
          onClose={close}
          TransitionComponent={Fade}
        >
          <li onClick={changeLanguage("en")} className="icocu">
            <a>
              <ReactCountryFlag countryCode="US" />
              ENG
            </a>
          </li>
          <li onClick={changeLanguage("ru")} className="icocu">
            <a>
              <ReactCountryFlag countryCode="RU" />
              RUS
            </a>
          </li>
        </Menu>
      </ThemeProvider>
    </div>
  );
};

export default LanguageSwitcher;
