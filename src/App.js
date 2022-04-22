import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import Preloader from "./Preloader/Preloader";
import Router from "./Router";

function App() {
  const getLibrary = (provider) => {
    const library = new Web3Provider(provider);

    library.pollingInterval = 12000;

    return library;
  };

  return (
    <React.Suspense fallback="">
      <Preloader />
      <Web3ReactProvider getLibrary={getLibrary}>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </Web3ReactProvider>
    </React.Suspense>
  );
}

export default App;
