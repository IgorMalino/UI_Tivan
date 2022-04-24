import React from "react";

import smalSize from "../../../../assets/img/smallSize.png";
import smalSizeLoading from "../../../../assets/img/smallSizeLoading.png";
import smalSizeClose from "../../../../assets/img/smallSizeClose.png";

import "./styles.css";

const WalletWindowWrapper = ({ className, children, onClose }) => {
  return (
    <div className={`wallet_window_wrapper ${className || ""}`}>
      <div className="modal">
        <img className="img" src={smalSize} />
        <img className="img_loading" src={smalSizeLoading} />
        <img className="img_close" onClick={onClose} src={smalSizeClose} />
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default WalletWindowWrapper;
