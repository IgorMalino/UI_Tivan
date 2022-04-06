import { injected, walletconnect, resetWalletConnector, walletlink, bsc } from '../Helpers/connectors';
import { useWeb3React } from '@web3-react/core';


export const getConnectFunctions = (web3reactContext) => {
    ;

    const connectBinanceWallet = async() => {
		try {
			await web3reactContext.activate(bsc);
		} catch (ex) {
			console.log(ex);
		}
	}

	const disconnectMetamaskSimple = () => {
		try {
			web3reactContext.deactivate();
		} catch (ex) {
			console.log(ex);
		}
	};

  //web3react metamask
	const connectMetamaskSimple = async () => {
		try {
			await web3reactContext.activate(injected);
		} catch (ex) {
			console.log(ex);
		}
	};

	//web3react walletconnect
	const connectWalletConnectSimple = async () => {
		try {
			resetWalletConnector(walletconnect);
			await web3reactContext.activate(walletconnect);
		} catch (ex) {
			console.log(ex);
		}
	};

	//web3react coinbase
	const connectCoinbaseSimple = async () => {
		try {
			await web3reactContext.activate(walletlink);
		} catch (ex) {
			console.log(ex);
		}
	};

    return {
        connectBinanceWallet, 
        disconnectMetamaskSimple, 
        connectMetamaskSimple, 
        connectWalletConnectSimple, 
        connectCoinbaseSimple
        }

}