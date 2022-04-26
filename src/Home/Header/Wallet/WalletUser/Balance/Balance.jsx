import React, { useEffect, useState } from "react";
import { faSync } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import contracts from "../../../../../contracts";

import "./styles.css";

const Balance = ({ account }) => {
  const [amount, setAmount] = useState(0);

  const refreshBalance = async () => {
    const amount = await contracts.tvt.methods.balanceOf(account).call();

    setAmount(amount);
  };

  useEffect(refreshBalance, []);

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
