import React from 'react';
import { useTranslation } from 'react-i18next';
// import CSS styles
import "./innerNav.css"

const content_item_cont = {
    about: "About",
    buyit: "Buy it"
}

const InnerNav = () => {
  const {t} = useTranslation()

    return (
        <div id="nav">
            <div id="nav-inner">
              <div id="nav-left" className="noSelect">
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                }}  data-id="About">{t("About")}</a>
              </div>
              <div id="nav-right" className="noSelect">
                <a href="#"  onClick={(e) => {
                  e.preventDefault();
                }} data-id="Buy it">{t("Buy_it")}</a>
              </div>
            </div>
          </div>
    )
}

export default InnerNav