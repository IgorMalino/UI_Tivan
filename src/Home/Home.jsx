import React from "react";

import Braces from "./Braces/Braces";
import InnerNav from "./InnerNav/InnerNav";
import Logo from "./Logo/Logo";
import Map from "./Map/Map";
import Navbar from "./Navbar/Navbar";

import "./home.css";

const Home = () => {
  return (
    <div className="home">
      <Logo />
      <Navbar />
      <Braces />
      <InnerNav />
      <Map />
    </div>
  );
};

export default Home;
