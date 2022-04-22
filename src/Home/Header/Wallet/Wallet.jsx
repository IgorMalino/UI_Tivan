import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import windowDimensions from "../../../utils/windowDimensions";

import UserWalletConnect from "./UserWalletConnect/UserWalletConnect";
import WalletList from "./WalletList/WalletList";

import "./wallet.css";

function Wallet() {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = React.useState(false);
  const { account } = useWeb3React();
  const { width } = windowDimensions();

  const close = () => {
    setIsOpen(false);
  };

  const open = () => {
    setIsOpen(true);
  };

  const getEllipsisTxt = (str, number) => {
    const newStr = str.split("");
    return [
      ...newStr.slice(0, number),
      "...",
      ...newStr.slice(newStr.length - number),
    ].join("");
  };

  console.log("account", account);

  return (
    <>
      {!account ? (
        <Button id="connect-button" style={{ color: "#00CCFF" }} onClick={open}>
          <span>
            <div>
              <FontAwesomeIcon
                style={{ marginRight: "5px", height: "16.5px" }}
                icon={faPlug}
              />
              <span className="connect_text">{t("Connect")}</span>
            </div>
          </span>
        </Button>
      ) : (
        <a onClick={open} className="social-icon" href="#">
          {" "}
          <FontAwesomeIcon
            style={{ marginRight: "5px" }}
            icon={faAddressCard}
          />{" "}
          <span className="acc_long_adr">
            {getEllipsisTxt(account, width < 500 ? 3 : 6)}
          </span>{" "}
        </a>
      )}

      {isOpen ? (
        account ? (
          <UserWalletConnect close={close} />
        ) : (
          <WalletList close={close} />
        )
      ) : null}
    </>
  );
}

export default Wallet;
