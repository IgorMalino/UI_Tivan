import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter } from "@fortawesome/free-brands-svg-icons";
import { faPencilRuler } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "react-i18next";

import LanguageSwitcher from "./LanguageSwitcher/LanguageSwitcher";
import Telegram from "./Telegram/Telegram";
import Wallet from "./Wallet/Wallet";

import "./header.css";

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className="header">
      <div className="left-side">
        <FontAwesomeIcon
          style={{ marginRight: "4px", height: "17.5px" }}
          icon={faPencilRuler}
        />
        {t("Presale_Text")}
      </div>

      <div className="right-side">
        <Wallet className="right-side-element" />
        <a
          className="right-side-element"
          href="https://twitter.com/Tivan_art"
          target="_blank"
          rel="noreferrer"
        >
          <FontAwesomeIcon icon={faTwitter} />
        </a>
        <Telegram className="right-side-element" />
        <LanguageSwitcher />
      </div>
    </div>
  );
};

export default Header;
