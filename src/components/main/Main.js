import React, {useState} from 'react';
import HeaderLogo from '../headerLogo/HeaderLogo';
import Navbar from '../navbar/Navbar';
import Map from '../map/Map';
import InnerNav from '../InnerNav/InnerNav';
import MinimapMenu from '../minimapMenu/MinimapMenu';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next'
import Hexagon from '../hex/Hexagon';
import Braces from '../../braces/Braces';
import HexGlobe from '../hex/HexGlobe'
import './main.css'
import { renderGlobe } from '../hex/renderGlobe';

const Main = () => {
    const { t } = useTranslation();
    
    const onChange = (event) => {
        i18n.changeLanguage(event.target.value);
      };

    if(!window.rendered) {
        // renderGlobe()
        window.rendered = true
    }

    return (
        <div className="main">
        <HeaderLogo />
        <Navbar />
        <HexGlobe />
        <Braces />
        <InnerNav />
        <MinimapMenu />
        </div>
    )
}

export default Main