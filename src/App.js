import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import i18n from "i18next";

import Main from "./components/main/Main";
import ContentWindow from "./components/contentWindow/ContentWindow";
import ArticlePage from "./components/news/ArticlePage";
import { UserContext } from "./UserContext";

function App() {
  const [anim, setAnim] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const getLibrary = (provider) => {
    const library = new Web3Provider(provider, "any");
    library.pollingInterval = 15000;
    return library;
  };

  useEffect(() => {
    if (location.pathname.split(`/${i18n.language}`)[1]) {
      const newPathname = [
        "/",
        i18n.language,
        ...location.pathname.split(`/${i18n.language}`)[1],
      ];
      navigate(newPathname.join(""));
    } else {
      const newPathname = `/${i18n.language}`;
      navigate(newPathname);
    }
  }, []);

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <UserContext.Provider value={{ anim, setAnim }}>
        <Routes>
          <Route path={`/${i18n.language}`} element={<Main />} />
          <Route
            path={`/${i18n.language}/:contenName`}
            element={<ContentWindow />}
          />
          <Route path={`/:contenName`} element={<ContentWindow />} />
          <Route
            path={`/${i18n.language}/news/:id`}
            element={<ArticlePage />}
          />
        </Routes>
      </UserContext.Provider>
    </Web3ReactProvider>
  );
}

export default App;
