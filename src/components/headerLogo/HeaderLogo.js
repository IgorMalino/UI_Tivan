import React from 'react';
// importing Css styles
import './headerLogo.css'

const content_item_cont = {
    about: "About",
    title_top: "Title Top",
    title_top_art: "Title Top Art"
}

const HeaderLogo = () => {
    return (
        <>
        <a href="#"  id="header" onClick={(e) => {
              e.preventDefault();
              window.zoomOut();
              window.toggleInfo_box("about");
            }}  data-id={content_item_cont.about}>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 58.95" className="animate logosvg">
                <path   className="animate"
                      d="M0,12.12,6.6,8.87Q15.53,4.49,24.45.13a1.34,1.34,0,0,1,1-.06Q37.58,6,49.71,12a.55.55,0,0,1,.29.27h-.55c-5.73,0-11.47,0-17.2,0a2,2,0,0,0-1.57.71c-1.85,2-3.74,3.93-5.68,6l-2.2-2.3c-1.25-1.3-2.47-2.62-3.74-3.88a1.57,1.57,0,0,0-1-.45c-5.78,0-11.56,0-17.34,0H0Z"/>
                <path   className="animate" d="M17.61,59C11.82,48.18,6,37.42.21,26.57h17.5V58.89Z"/>
                <path   className="animate" d="M32.28,58.89V26.6h17.5L32.4,58.94Z"/>

              </svg>
            </div>
            <div className="animate"><strong>{content_item_cont.title_top}</strong></div>
            <div className="subtitle animate">{content_item_cont.title_top_art}</div>
          </a></>
    )
}

export default HeaderLogo