import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useLocation } from "react-router";
import i18n from "i18next";

import Home from "./Home/Home";
import ContentWindow from "./components/contentWindow/ContentWindow";
import ArticlePage from "./News/ArticlePage";

function Router() {
  const navigate = useNavigate();
  const location = useLocation();

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
