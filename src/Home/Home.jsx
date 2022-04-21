import React from "react";

import Braces from "./Braces/Braces";
import Header from "./Header/Header";
import InnerNav from "./InnerNav/InnerNav";
import Logo from "./Logo/Logo";
import Map from "./Map/Map";

import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Logo />
      <Header />
      <Braces />
      <InnerNav />
      <Map />
    </div>
  );
};

export default Home;
