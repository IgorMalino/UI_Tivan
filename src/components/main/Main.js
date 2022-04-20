import React from "react";

import HeaderLogo from "../headerLogo/HeaderLogo";
import Navbar from "../navbar/Navbar";
import InnerNav from "../InnerNav/InnerNav";
import MinimapMenu from "../minimapMenu/MinimapMenu";
import Braces from "../../braces/Braces";
import "./main.css";

const Main = () => {
  return (
    <div className="main">
      <HeaderLogo />
      <Navbar />
      <Braces />
      <InnerNav />
      <MinimapMenu />
    </div>
  );
};

export default Main;
