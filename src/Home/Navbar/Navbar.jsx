import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPencilRuler } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";

import ConnectWallet from "./connectWallet/ConnectWallet";
import ChooseLanguage from "./chooseLanguage/ChooseLanguage";
import Language from "./Language/Language";

import "./navbar.css";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <div className="navbar">
      <div className="left-side">
        <FontAwesomeIcon
          style={{ marginRight: "4px", height: "17.5px" }}
          icon={faPencilRuler}
        />
        {t("Presale_Text")}
      </div>

      <div className="right-side">
        <ConnectWallet className="right-side-element" />
        <a
          className="right-side-element"
          href="https://twitter.com/Tivan_art"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <ChooseLanguage className="right-side-element" />
        <Language />
      </div>
    </div>
  );
};

export default Navbar;
