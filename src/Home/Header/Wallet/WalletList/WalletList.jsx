import React from "react";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import { connectors } from "./config";
import { getConnectFunctions } from "../../../../utils/getConnectFunctions";
import smalSize from "../../../../assets/img/smallSize.png";
import smalSizeLoading from "../../../../assets/img/smallSizeLoading.png";
import smalSizeClose from "../../../../assets/img/smallSizeClose.png";

import watchImg from "./img/cs.png";

import "../wallet.css";

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

const WalletList = ({ handleClose }) => {
  const web3reactContext = useWeb3React();
  const { t } = useTranslation();
  const {
    connectBinanceWallet,
    connectWalletConnectSimple,
    connectCoinbaseSimple,
    connectMetamaskSimple,
  } = getConnectFunctions(web3reactContext, handleClose);

  const getConnector = (name) => {
    switch (name) {
      case "Metamask":
        return connectMetamaskSimple;
      case "Coinbase":
        return connectCoinbaseSimple;
      case "WalletConnect":
        return connectWalletConnectSimple;
      case "Binance":
        return connectBinanceWallet;
    }
  };

  return (
    <div className="ConnectWalletContent_wrapper">
      <div className="ConnectWalletContent_modal">
        <img className="ConnectWalletContent_img" src={smalSize} />
        <img
          className="ConnectWalletContent_img_loading"
          src={smalSizeLoading}
        />
        <img
          className="ConnectWalletContent_img_close"
          onClick={handleClose}
          src={smalSizeClose}
        />
        <div className="ConnectWalletContent_content">
          <div>{t("Choose_wallet")}:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                onClick={getConnector(title)}
                style={styles.connector}
                key={key}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <p style={{ fontSize: "14px" }}>{title}</p>
              </div>
            ))}
            <div style={styles.connector}>
              <img src={watchImg} alt="TokenPocket" style={styles.icon} />
              <p style={{ fontSize: "14px" }}>{t("More_wallets_coming")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletList;
