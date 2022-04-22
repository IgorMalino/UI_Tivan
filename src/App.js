import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import i18n from "i18next";

import Home from "./Home/Home";
import ContentWindow from "./components/contentWindow/ContentWindow";
import ArticlePage from "./News/ArticlePage";

function App() {
  const navigate = useNavigate();
  const location = useLocation();

  const getLibrary = (provider) => {
    const library = new Web3Provider(provider);

    library.pollingInterval = 12000;

    return library;
  };

  useEffect(() => {
    const pathname = location.pathname.split(`/${i18n.language}`)[1]
      ? [
          `/${i18n.language}`,
          ...location.pathname.split(`/${i18n.language}`)[1],
        ].join("")
      : `/${i18n.language}`;

    navigate(pathname);
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Routes>
        <Route path={`/${i18n.language}/news/:id`} element={<ArticlePage />} />
        <Route
          path={`/${i18n.language}/:contenName`}
          element={<ContentWindow />}
        />
        <Route path={`/${i18n.language}`} element={<Home />} />
      </Routes>
    </Web3ReactProvider>
  );
}

export default App;
