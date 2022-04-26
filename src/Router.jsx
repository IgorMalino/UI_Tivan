import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import i18n from "i18next";

import Home from "./Home/Home";
import ContentWindow from "./components/ContentWindow/ContentWindow";
import ArticlePage from "./News/ArticlePage";

function Router() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.indexOf(`/${i18n.language}`) !== 0) {
      navigate(`/${i18n.language}`);
    }
  }, []);

  return (
    <Routes>
      <Route path={`/${i18n.language}/news/:id`} element={<ArticlePage />} />
      <Route
        path={`/${i18n.language}/:contenName`}
        element={<ContentWindow />}
      />
      <Route path={`/${i18n.language}`} element={<Home />} />
    </Routes>
  );
}

export default Router;
