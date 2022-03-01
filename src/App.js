import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import ConnectWallet from './components/ConnectWallet'
import Main from './components/main/Main'
import Map from './components/map/Map'
import Navbar from './components/navbar/Navbar'


function App() {
	const getLibrary = (provider) => {
		const library = new Web3Provider(provider, 'any');
		library.pollingInterval = 15000;
		return library;
	};

	return (
		<Web3ReactProvider getLibrary={getLibrary}>
				<Navbar />
				<Map className="sone"/>
		</Web3ReactProvider>
	);
}

export default App;