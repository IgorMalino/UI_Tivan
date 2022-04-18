import React, { useState } from 'react';
import { World } from './Globe'
import './styles/App.css'
const HexGlobe = () => {
  return (
    <div className="main" >
      <div className="container">
        <div className="sky">

          <div className="stars"></div>
          <div className="stars1"></div>
          <div className="stars2"></div>

          <div className="shooting-stars"></div>
        </div>
      </div>
      <World />


    </div>
  );
};

export default HexGlobe;