import React, { useEffect } from "react";
import Web3 from "web3";

import TextToCopy from "../../../../components/TextToCopy/TextToCopy";

import contracts from "../contracts";

const ReferalLink = ({ account }) => {
  const [refInfo, setRefInfo] = React.useState(null);

  const getRefInfo = async () => {
    const info = await contracts.presale.methods.getRefInfo(account).call();

    if (info.status) {
      setRefInfo({
        needAmount: Web3.utils.fromWei(info.needAmount, 18).toFixed(2),
        needMoreAmount: Web3.utils.fromWei(info.needMoreAmount, 18).toFixed(2),
        totalAmount: Web3.utils.fromWei(info.totalAmount, 18).toFixed(2),
      });
    } else {
      setRefInfo(null);
    }
  };

  useEffect(() => {
    getRefInfo(account);
  });

  return (
    <div>
      You Referral link:
      {refInfo ? (
        <>
          <p>
            To get a referral link you need to buy {refInfo.needAmount} TVT.
          </p>
          <p>
            You have {refInfo.totalAmount} TVT. Buy more{" "}
            {refInfo.needMoreAmount} TVT.
          </p>
        </>
      ) : (
        <TextToCopy value={`https://tivan.art/ref/${account}`} />
      )}
    </div>
  );
};

export default ReferalLink;
