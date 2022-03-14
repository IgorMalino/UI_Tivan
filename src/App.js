import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import ConnectWallet from './components/ConnectWallet'
import Main from './components/main/Main'
import Map from './components/map/Map'
import Navbar from './components/navbar/Navbar'
import Innernav from './components/InnerNav/InnerNav'
import MinimapMenu from './components/minimapMenu/MinimapMenu';
import HeaderLogo from './components/headerLogo/HeaderLogo'
import Hexagon from './components/hex/Hexagon';
import {BrowserRouter as Router, Switch, Route,} from 'react-router-dom'


function App() {
	const getLibrary = (provider) => {
		const library = new Web3Provider(provider, 'any');
		library.pollingInterval = 15000;
		return library;
	};

	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Router>
				{/* <HeaderLogo />
				<Navbar />
				<Map/>
				<Innernav />
				<MinimapMenu /> */}
				<Hexagon />
			</Router>
		</Web3ReactProvider>
	);
}

export default App;