import React, { useEffect } from "react";
import i18n from "i18next";
import Web3 from "web3";

import TextToCopy from "../../../../../components/TextToCopy/TextToCopy";

import contracts from "../../../../../contracts";

const ReferralLink = ({ account }) => {
  const [data, setData] = React.useState();

  const getData = async (account) => {
    const data = await contracts.presale.methods.getRefInfo(account).call();

    setData({
      needAmount: Web3.utils.fromWei(data.needAmount),
      needMoreAmount: Web3.utils.fromWei(data.needMoreAmount),
      totalAmount: Web3.utils.fromWei(data.totalAmount),
    });
  };

  useEffect(() => {
    getData(account);
  }, []);

  if (!data) {
    return null;
  }

  return (
    <div>
      You Referral link:
      {data.needMoreAmount > 0 && false ? (
        <>
          <p>To get a referral link you need to buy {data.needAmount} TVT.</p>
          <p>
            You have {data.totalAmount} TVT. Buy more {data.needMoreAmount} TVT.
          </p>
        </>
      ) : (
        <TextToCopy
          value={`${window.location.origin}/${i18n.language}/presale/ref/${account}`}
        />
      )}
    </div>
  );
};

export default ReferralLink;
