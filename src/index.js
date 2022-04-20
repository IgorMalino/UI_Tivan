import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App";
import "./i18n/i18n";
import Preloader from "./Preloader/Preloader";
import reportWebVitals from "./reportWebVitals";

import "./index.css";
import "semantic-ui-css/semantic.min.css";

ReactDOM.render(
  <React.Suspense fallback="">
    <Preloader />
    <Router>
      <App />
    </Router>
  </React.Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
