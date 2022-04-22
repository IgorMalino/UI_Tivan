import React from "react";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import smalSize from "../../../../assets/img/smallSize.png";
import smalSizeLoading from "../../../../assets/img/smallSizeLoading.png";
import smalSizeClose from "../../../../assets/img/smallSizeClose.png";

import hourglass from "./img/hourglass.png";

import config from "./config";
import createConnector from "./createConnector";

import "../wallet.css";

const styles = {
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

const WalletList = ({ close }) => {
  const web3ReactContext = useWeb3React();

  const { t } = useTranslation();

  const connect = (type) => () => {
    debugger;

    const connector = createConnector(type);

    web3ReactContext.activate(connector);
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
          onClick={close}
          src={smalSizeClose}
        />
        <div className="ConnectWalletContent_content">
          <div>{t("Choose_wallet")}:</div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {config.map(({ logo, title, type }) => {
              return (
                <a onClick={connect(type)} style={styles.connector} key={type}>
                  <img src={logo} alt={title} style={styles.icon} />
                  <p style={{ fontSize: "14px" }}>{title}</p>
                </a>
              );
            })}

            <div style={styles.connector}>
              <img src={hourglass} alt="" style={styles.icon} />
              <p style={{ fontSize: "14px" }}>{t("More_wallets_coming")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletList;
