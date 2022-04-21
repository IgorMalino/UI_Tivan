import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTelegram } from "@fortawesome/free-brands-svg-icons";
import Fade from "@mui/material/Fade";
import Menu from "@mui/material/Menu";
import { ThemeProvider } from "@mui/material/styles";
import ReactCountryFlag from "react-country-flag";

import theme from "../theme";

import "./styles.css";

const Telegram = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const close = () => {
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
          onClose={close}
          TransitionComponent={Fade}
        >
          <li className="icocu">
            <a target="_blank" href="http://t.me/TIVAN_ENG" onClick={close}>
              <FontAwesomeIcon icon={faTelegram} />
              &nbsp;
              <ReactCountryFlag countryCode="US" /> ENG
            </a>
          </li>
          <li className="icocu">
            <a target="_blank" href="http://t.me/TIVAN_RUS" onClick={close}>
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
