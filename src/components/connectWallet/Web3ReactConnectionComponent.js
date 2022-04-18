import { useWeb3React } from '@web3-react/core';
import { injected, walletconnect, resetWalletConnector, walletlink, bsc } from '../../Helpers/connectors';
import React from 'react';

const Web3ReactConnectionComponent = () => {
	//connector, library, chainId, account, activate, deactivate
	const web3reactContext = useWeb3React(); 
	//web3react
	
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

	//web3react context
	const checkInfoSimple = async () => {
		try {
			console.log('web3reactContext');
			console.log(web3reactContext);
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

	console.log(web3reactContext.account, "account")

	return (
		<div>
			<h2>Tivan Connect</h2>
			{web3reactContext.account ? <p>{web3reactContext.account}</p> : <p>Not connected</p>}
			<div>
				<button	
					onClick={checkInfoSimple}
				>
					Check web3react Context
				</button>
				<button	
					onClick={disconnectMetamaskSimple}
				>
					Disconnect Web3React
				</button>
			</div>
			<div>
				<button
					onClick={connectMetamaskSimple}
				>
					Connect Metamask Via Web3-React
				</button>
			</div>
			<div>
				<button
					onClick={connectWalletConnectSimple}
				>
					Connect walletconnect Via Web3-React
				</button>
			</div>
			<div>
				<button
					onClick={connectCoinbaseSimple}
				>
					Connect coinbase Via Web3-React
				</button>
			</div>
			<div>
				<button
					onClick={connectBinanceWallet}
				>
					Connect Connect Binance Wallet Via Web3-React
				</button>
			</div>
		</div>
	);
};
export default Web3ReactConnectionComponent;
