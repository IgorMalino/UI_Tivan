import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import ConnectWallet from './components/ConnectWallet'
import Main from './components/main/Main'
import Map from './components/map/Map'
import Navbar from './components/navbar/Navbar'
import Innernav from './components/InnerNav/InnerNav'
import MinimapMenu from './components/minimapMenu/MinimapMenu';
import HeaderLogo from './components/headerLogo/HeaderLogo'
import {BrowserRouter as Router,  Routes, Route} from 'react-router-dom'
import ContentWindow from './components/contentWindow/ContentWindow';


function App() {
	const getLibrary = (provider) => {
		const library = new Web3Provider(provider, 'any');
		library.pollingInterval = 15000;
		return library;
	};

	return (
		<Web3ReactProvider getLibrary={getLibrary}>
			<Router>
				<Routes>
					<Route path="/" element={<Main />} />
					<Route path='/:contenName' element={<ContentWindow />} />
				</Routes>
			
				{/* <Route path='/:contenName' element={<ContentWindow />}/> */}
			{/* </Route> */}
				
			</Router>
		</Web3ReactProvider>
	);
}

export default App;