import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import windowDimensions from "../../../utils/windowDimensions";

import WalletList from "./WalletList/WalletList";
import WalletUser from "./WalletUser/WalletUser";

import getEllipsisText from "./getEllipsisText";

import "./styles.css";

function Wallet() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const { account } = useWeb3React();
  const { width } = windowDimensions();

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  return (
    <>
      {!account ? (
        <button id="connect-button" onClick={handleOpen}>
          <FontAwesomeIcon
            style={{ marginRight: "5px", height: "16.5px" }}
            icon={faPlug}
          />
          <span className="connect_text">{t("Connect")}</span>
        </button>
      ) : (
        <button className="social-icon" onClick={handleOpen}>
          <FontAwesomeIcon
            style={{ marginRight: "5px" }}
            icon={faAddressCard}
          />
          {getEllipsisText(account, width < 500 ? 3 : 6)}
        </button>
      )}

      {isOpen ? (
        account ? (
          <WalletUser onClose={handleClose} />
        ) : (
          <WalletList onClose={handleClose} />
        )
      ) : null}
    </>
  );
}

export default Wallet;
