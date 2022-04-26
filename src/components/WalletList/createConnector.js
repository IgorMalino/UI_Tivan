import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";
import { BscConnector } from "@binance-chain/bsc-connector";

import config from "./config";

const createConnector = (type) => {
  const connectorConfig = config.find((connector) => type === connector.type);

  if (type === "binance") {
    return new BscConnector(connectorConfig["options"]);
  }

  if (type === "coinbase") {
    return new WalletLinkConnector(connectorConfig["options"]);
  }

  if (type === "metamask") {
    return new InjectedConnector(connectorConfig["options"]);
  }

  if (type === "walletConnect") {
    return new WalletConnectConnector(connectorConfig["options"]);
  }
};

export default createConnector;
