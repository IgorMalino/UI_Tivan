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
  const [open, setOpen] = React.useState(false);
  const { account } = useWeb3React();
  const { width } = windowDimensions();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();

  const getEllipsisTxt = (str, number) => {
    const newStr = str.split("");
    return [
      ...newStr.slice(0, number),
      "...",
      ...newStr.slice(newStr.length - number),
    ].join("");
  };

  return (
    <>
      {!account ? (
        <Button
          id="connect-button"
          style={{ color: "#00CCFF" }}
          onClick={handleOpen}
        >
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
        <a onClick={handleOpen} className="social-icon" href="#">
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

      {open ? (
        !account ? (
          <WalletList handleClose={handleClose} />
        ) : (
          <UserWalletConnect handleClose={handleClose} />
        )
      ) : null}
    </>
  );
}

export default Wallet;
