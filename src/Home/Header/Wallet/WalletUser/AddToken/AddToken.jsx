import React from "react";
import { useTranslation } from "react-i18next";
import Web3 from "web3";

const AddToken = () => {
  const { t } = useTranslation();

  const onClick = () => {
    try {
      const web3 = new Web3(Web3.givenProvider);

      web3.currentProvider.sendAsync({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: process.env.REACT_APP_CONTRACT_TVT,
            symbol: "TVT",
            decimals: "18",
            image: `${window.location.origin}/img/tvt.png`,
          },
        },
        id: Math.round(Math.random() * 100000),
      });
    } catch (e) {
      console.log(e);
    }
  };

  return <button onClick={onClick}>{t("Add TVT token to Web3 Wallet")}</button>;
};

export default AddToken;
