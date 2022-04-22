import React from "react";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import smalSize from "../../../../assets/img/smallSize.png";
import smalSizeLoading from "../../../../assets/img/smallSizeLoading.png";
import smalSizeClose from "../../../../assets/img/smallSizeClose.png";

import ERC20TTVTBalance from "./ERC20TTVTBalance";
import ReferalLink from "./ReferalLink";

import "../wallet.css";

const UserWalletConnect = ({ handleClose }) => {
  const web3reactContext = useWeb3React();

  const getEllipsisTxt = (str, number) => {
    const newStr = str.split("");
    return [
      ...newStr.slice(0, number),
      "...",
      ...newStr.slice(newStr.length - number),
    ].join("");
  };

  return (
    <div className="ConnectWalletContent_wrapper">
      <div className="ConnectWalletContent_modal">
        <img className="ConnectWalletContent_img" src={smalSize} />
        <img
          className="ConnectWalletContent_img_loading"
          src={smalSizeLoading}
        />
        <img
          className="ConnectWalletContent_img_close"
          onClick={handleClose}
          src={smalSizeClose}
        />
        <div className="UserWalletConnect_content">
          <div id="f_account" className="">
            <h2 className="animate">ACCOUNT</h2>
            <p>{getEllipsisTxt(web3reactContext.account, 6)}</p>
            <p className="bal_teg">
              <ERC20TTVTBalance />
            </p>
            {/* <p className="bal_teg"><NativeBalance /></p> */}
            <a
              href="#"
              onClick={(e) => {
                web3reactContext.deactivate();
                handleClose();
              }}
            >
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
                            address:
                              "0x0b260a12cb0f59d24fdd1d56ca5569f3925e233a",
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
            <div
              style={{ marginTop: "10px", padding: "0 10px", fontSize: "14px" }}
            >
              <a
                href="https://bscscan.com/address/0xf029ebed6b0ed51f50f47749d1c416098850fffe"
                target="_blank"
                rel="noreferrer"
              >
                {/* <SelectOutlined style={{ marginRight: "5px" }} /> */}
                View on explorer
              </a>
            </div>
            <ReferalLink />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserWalletConnect;
