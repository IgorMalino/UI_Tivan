import Binance from "./img/Logo/Binance.png";
import Coinbase from "./img/Logo/Coinbase.png";
import Metamask from "./img/Logo/Metamask.png";
import WalletConnect from "./img/Logo/WalletConnect.svg";

const config = [
  {
    options: {
      supportedChainIds: [56, 97],
    },
    logo: Binance,
    title: "Binance",
    type: "binance",
  },
  {
    options: {
      url: "https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4",
      appName: "demo-app",
      supportedChainIds: [1, 4],
    },
    logo: Coinbase,
    title: "Coinbase",
    type: "coinbase",
  },
  {
    options: {
      supportedChainIds: [1, 3, 4, 5, 42, 56, 97],
    },
    logo: Metamask,
    title: "Metamask",
    type: "metamask",
  },
  {
    options: {
      rpc: {
        1: "https://mainnet.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4",
        4: "https://rinkeby.infura.io/v3/55d040fb60064deaa7acc8e320d99bd4",
      },
      qrcode: true,
      pollingInterval: 15000,
    },
    logo: WalletConnect,
    title: "WalletConnect",
    type: "walletConnect",
  },
];

export default config;
