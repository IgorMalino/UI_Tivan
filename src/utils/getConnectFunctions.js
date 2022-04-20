import {
  injected,
  walletconnect,
  resetWalletConnector,
  walletlink,
  bsc,
} from "../Helpers/connectors";

export const getConnectFunctions = (web3reactContext, handleClose) => {
  const connectBinanceWallet = async () => {
    try {
      await web3reactContext.activate(bsc);
      handleClose();
    } catch (ex) {
      console.log(ex);
    }
  };

  const disconnectMetamaskSimple = () => {
    try {
      web3reactContext.deactivate();
      handleClose();
    } catch (ex) {
      console.log(ex);
    }
  };

  //web3react metamask
  const connectMetamaskSimple = async () => {
    try {
      await web3reactContext.activate(injected);
      handleClose();
    } catch (ex) {
      console.log(ex);
    }
  };

  //web3react walletconnect
  const connectWalletConnectSimple = async () => {
    try {
      resetWalletConnector(walletconnect);
      await web3reactContext.activate(walletconnect);
      handleClose();
    } catch (ex) {
      console.log(ex);
    }
  };

  //web3react coinbase
  const connectCoinbaseSimple = async () => {
    try {
      await web3reactContext.activate(walletlink);
      handleClose();
    } catch (ex) {
      console.log(ex);
    }
  };

  return {
    connectBinanceWallet,
    disconnectMetamaskSimple,
    connectMetamaskSimple,
    connectWalletConnectSimple,
    connectCoinbaseSimple,
  };
};
