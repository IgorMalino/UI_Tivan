import { Web3ReactProvider } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import Main from "./components/main/Main";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { useLocation } from "react-router";
import ContentWindow from "./components/contentWindow/ContentWindow";
import i18n from "i18next";
import { useEffect, createContext, useState } from "react";
import ArticlePage from "./components/news/ArticlePage";
import { UserContext } from "./UserContext";

function App() {
  const [anim, setAnim] = useState(true);
  const TivanContext = createContext();
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location.pathname)
  const getLibrary = (provider) => {
    const library = new Web3Provider(provider, "any");
    library.pollingInterval = 15000;
    return library;
  };

  useEffect(() => {
    const newPath = location.pathname;
    // const some3 = [location.pathname[0], ...i18n.language.split(''), ...location.pathname.split('').slice(1)]
    if (location.pathname.split(`/${i18n.language}`)[1]) {
      const newPathname = [
        "/",
        i18n.language,
        ...location.pathname.split(`/${i18n.language}`)[1],
      ];
      navigate(newPathname.join(""));
    } else {
      const newPathname = `/${i18n.language}`;
      console.log(newPathname);
      navigate(newPathname);
    }
    // navigate(some3.join(''))
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
