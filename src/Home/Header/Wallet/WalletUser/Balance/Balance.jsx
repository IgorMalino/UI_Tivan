import React from "react";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles.css";

const Balance = ({ account }) => {
  const refreshBalance = () => {};

  const amount = 0;

  return (
    <p className="balance_amount">
      {amount} TVT
      <FontAwesomeIcon
        className="balance_icon"
        icon={faSync}
        onClick={refreshBalance}
      />
    </p>
  );
};

export default Balance;
