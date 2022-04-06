import Metamask from "./WalletIcons/metamaskWallet.png";
import Coin98 from "./WalletIcons/Coin98.png";
import WalletConnect from "./WalletIcons/wallet-connect.svg";
import MathWallet from "./WalletIcons/MathWallet.svg";
import TokenPocket from "./WalletIcons/TokenPocket.svg";
import SafePal from "./WalletIcons/SafePal.svg";
import TrustWallet from "./WalletIcons/TrustWallet.png";
import Coinbase from "./WalletIcons/Coinbase.png";
import Binance from "./WalletIcons/Binance.png"



export const connectors1 = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: "injected",
    priority: 1,
  }
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
  }
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
