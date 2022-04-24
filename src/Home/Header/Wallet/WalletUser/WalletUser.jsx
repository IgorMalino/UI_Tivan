import React from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import WalletWindowWrapper from "../WalletWindowWrapper/WalletWindowWrapper";

import Address from "./Address/Address";
import Balance from "./Balance/Balance";
// import ReferalLink from "./ReferalLink";

import getEllipsisText from "../getEllipsisText";

import "./styles.css";

const WalletUser = ({ onClose }) => {
  const { account, deactivate } = useWeb3React();

  return (
    <WalletWindowWrapper className="wallet_user_content" onClose={onClose}>
      <h2 className="animate">ACCOUNT</h2>

      <Address value={account} />

      <Balance account={account} />

      <a href="#" onClick={deactivate}>
        Log out
      </a>

      <div style={{ marginTop: "10px", padding: "0 10px" }}>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const web3 = new Web3(Web3.givenProvider);
            try {
              web3.currentProvider.sendAsync(
                {
                  method: "wallet_watchAsset",
                  params: {
                    type: "ERC20",
                    options: {
                      address: "0x0b260a12cb0f59d24fdd1d56ca5569f3925e233a",
                      symbol: "TVT",
                      decimals: "18",
                      image: "https://tivan.art/img/fav/tokenLogo.png",
                    },
                  },
                  id: Math.round(Math.random() * 100000),
                },
                function (err, data) {
                  if (!err) {
                    if (data.result) {
                      console.log("Token added");
                    } else {
                      console.log(data);
                      console.log("Some error");
                    }
                  } else {
                    console.log(err.message);
                  }
                }
              );
            } catch (e) {
              console.log(e);
            }
          }}
        >
          Add TVT token to Web3 Wallet
        </a>
      </div>

      <div style={{ marginTop: "10px", padding: "0 10px", fontSize: "14px" }}>
        <a
          href={`https://bscscan.com/address/${account}`}
          rel="noreferrer"
          target="_blank"
        >
          View on explorer
        </a>
      </div>

      {/* <ReferalLink /> */}
    </WalletWindowWrapper>
  );
};

export default WalletUser;
