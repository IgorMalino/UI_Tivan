import Binance from "./img/Binance.png";
import Coin98 from "./img/Coin98.png";
import Coinbase from "./img/Coinbase.png";
import Math from "./img/Math.svg";
import Metamask from "./img/Metamask.png";
import SafePal from "./img/SafePal.svg";
import TokenPocket from "./img/TokenPocket.svg";
import Trust from "./img/Trust.png";
import WalletConnect from "./img/WalletConnect.svg";

export const connectors1 = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
];

export const connectors = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: "walletconnect",
    priority: 2,
  },
  {
    title: "Coinbase",
    icon: Coinbase,
    connectorId: "Coinbase",
    priority: 2,
  },
  {
    title: "Binance",
    icon: Binance,
    connectorId: "Binance",
    priority: 2,
  },
  // {
  //   title: "Trust Wallet",
  //   icon: TrustWallet,
  //   connectorId: "injected",
  //   priority: 3,
  // },
  // {
  //   title: "MathWallet",
  //   icon: MathWallet,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "TokenPocket",
  //   icon: TokenPocket,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "SafePal",
  //   icon: SafePal,
  //   connectorId: "injected",
  //   priority: 999,
  // },
  // {
  //   title: "Coin98",
  //   icon: Coin98,
  //   connectorId: "injected",
  //   priority: 999,
  // },
];
