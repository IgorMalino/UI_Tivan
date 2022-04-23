import React from "react";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import WalletWindowWrapper from "../WalletWindowWrapper/WalletWindowWrapper";

import hourglass from "./img/hourglass.png";

import config from "./config";
import createConnector from "./createConnector";

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
  title: {
    fontSize: "14px",
  },
};

const WalletList = ({ onClose }) => {
  const { activate } = useWeb3React();

  const { t } = useTranslation();

  const connect = (type) => () => {
    const connector = createConnector(type);

    activate(connector);
  };

  return (
    <WalletWindowWrapper onClose={onClose}>
      <div>{t("Choose_wallet")}:</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
        {config.map(({ logo, title, type }) => {
          return (
            <a onClick={connect(type)} style={styles.connector} key={type}>
              <img src={logo} alt={title} style={styles.icon} />
              <p style={styles.title}>{title}</p>
            </a>
          );
        })}

        <div style={styles.connector}>
          <img src={hourglass} alt="" style={styles.icon} />
          <p style={styles.title}>{t("More_wallets_coming")}</p>
        </div>
      </div>
    </WalletWindowWrapper>
  );
};

export default WalletList;
