import React from 'react';

// import CSS styles
import "./innerNav.css"

const content_item_cont = {
    about: "About",
    buyit: "Buy it"
}

const InnerNav = () => {


    return (
        <div id="nav">
            <div id="nav-inner">
              <div id="nav-left" className="noSelect">
                <a href="#" onClick={(e) => {
                  e.preventDefault();
                //   window.toggleInfo_box("about")
                }}  data-id={content_item_cont.about}>{content_item_cont.about}</a>
              </div>
              <div id="nav-right" className="noSelect">
                <a href="#"  onClick={(e) => {
                  e.preventDefault();
                //   trg_open_page("buyit")
                }} data-id={content_item_cont.buyit}>{content_item_cont.buyit}</a>
              </div>
            </div>
          </div>
    )
}

export default InnerNav