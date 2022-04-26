import React from "react";
import { useTranslation } from "react-i18next";
import { useWeb3React } from "@web3-react/core";

import TextToCopy from "../../../../components/TextToCopy/TextToCopy";
import WalletWindowWrapper from "../../../../components/WalletWindowWrapper/WalletWindowWrapper";

import AddToken from "./AddToken/AddToken";
import Balance from "./Balance/Balance";
import ReferralLink from "./ReferralLink/ReferralLink";

import "./styles.css";

const WalletUser = ({ onClose }) => {
  const { t } = useTranslation();
  const { account, deactivate } = useWeb3React();

  return (
    <WalletWindowWrapper className="wallet_user_content" onClose={onClose}>
      <h2>{t("Account")}</h2>

      <TextToCopy value={account} />

      <Balance account={account} />

      <button onClick={deactivate}>{t("Logout")}</button>

      <AddToken />

      <a
        href={`${process.env.REACT_APP_ETHEREUM_EXPLORER_URL}/address/${account}`}
        rel="noreferrer"
        target="_blank"
      >
        {t("View on explorer")}
      </a>

      <ReferralLink account={account} />
    </WalletWindowWrapper>
  );
};

export default WalletUser;
