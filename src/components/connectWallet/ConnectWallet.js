import React from "react";
import Button from "@mui/material/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug, faAddressCard } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";

import { connectors } from "./config";
import watchImg from "../../assets/img/cs.png";
import { getConnectFunctions } from "../../utils/getConnectFunctions";
import smalSize from "../../assets/img/smallSize.png";
import smalSizeLoading from "../../assets/img/smallSizeLoading.png";
import smalSizeClose from "../../assets/img/smallSizeClose.png";

import ERC20TTVTBalance from "./ERC20TTVTBalance";
import ReferalLink from "./ReferalLink";
import windowDimensions from "../../utils/windowDimensions";

import "./connectWallet.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const styles = {
  account: {
    height: "42px",
    padding: "0 15px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "fit-content",
    borderRadius: "12px",
    backgroundColor: "rgb(244, 244, 244)",
    cursor: "pointer",
  },
  text: {
    color: "#21BF96",
  },
  connector: {
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    height: "auto",
    justifyContent: "center",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "20px 5px",
    cursor: "pointer",
  },
  icon: {
    alignSelf: "center",
    fill: "rgb(40, 13, 95)",
    flexShrink: "0",
    marginBottom: "8px",
    height: "30px",
  },
};

export const ConnectWalletContent = ({ handleClose }) => {
  const web3reactContext = useWeb3React();
  const { t } = useTranslation();
  const {
    connectBinanceWallet,
    connectWalletConnectSimple,
    connectCoinbaseSimple,
    connectMetamaskSimple,
  } = getConnectFunctions(web3reactContext, handleClose);

  const getConnector = (name) => {
    switch (name) {
      case "Metamask":
        return connectMetamaskSimple;
      case "Coinbase":
        return connectCoinbaseSimple;
      case "WalletConnect":
        return connectWalletConnectSimple;
      case "Binance":
        return connectBinanceWallet;
    }
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
        <div className="ConnectWalletContent_content">
          <div>{t("Choose_wallet")}:</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
            {connectors.map(({ title, icon, connectorId }, key) => (
              <div
                onClick={getConnector(title)}
                style={styles.connector}
                key={key}
              >
                <img src={icon} alt={title} style={styles.icon} />
                <p style={{ fontSize: "14px" }}>{title}</p>
              </div>
            ))}
            <div style={styles.connector}>
              <img src={watchImg} alt="TokenPocket" style={styles.icon} />
              <p style={{ fontSize: "14px" }}>{t("More_wallets_coming")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const UserWalletConnect = ({ handleClose }) => {
  const web3reactContext = useWeb3React();
  const { t } = useTranslation();
  const {
    connectBinanceWallet,
    connectWalletConnectSimple,
    connectCoinbaseSimple,
    connectMetamaskSimple,
  } = getConnectFunctions(web3reactContext);

  const getEllipsisTxt = (str, number) => {
    const newStr = str.split("");
    return [
      ...newStr.slice(0, number),
      "...",
      ...newStr.slice(newStr.length - number),
    ].join("");
  };

  const getConnector = (name) => {
    switch (name) {
      case "Metamask":
        return connectMetamaskSimple;
      case "Coinbase":
        return connectCoinbaseSimple;
      case "WalletConnect":
        return connectWalletConnectSimple;
      case "Binance":
        return connectBinanceWallet;
    }
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

function ConnectWallet() {
  const [open, setOpen] = React.useState(false);
  const { account } = useWeb3React();
  const { width } = windowDimensions();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const { t } = useTranslation();

  const getEllipsisTxt = (str, number) => {
    const newStr = str.split("");
    return [
      ...newStr.slice(0, number),
      "...",
      ...newStr.slice(newStr.length - number),
    ].join("");
  };

  console.log();

  return (
    <React.Fragment>
      {!account ? (
        <Button
          id="connect-button"
          style={{ color: "#00CCFF" }}
          onClick={handleOpen}
        >
          <span>
            <div>
              <FontAwesomeIcon
                style={{ marginRight: "5px", height: "16.5px" }}
                icon={faPlug}
              />
              <span className="connect_text">{t("Connect")}</span>
            </div>
          </span>
        </Button>
      ) : (
        <>
          <a onClick={handleOpen} className="social-icon" href="#">
            {" "}
            <FontAwesomeIcon
              style={{ marginRight: "5px" }}
              icon={faAddressCard}
            />{" "}
            <span className="acc_long_adr">
              {getEllipsisTxt(account, width < 500 ? 3 : 6)}
            </span>{" "}
          </a>
        </>
      )}

      {open ? (
        !account ? (
          <ConnectWalletContent handleClose={handleClose} />
        ) : (
          <UserWalletConnect handleClose={handleClose} />
        )
      ) : null}
    </React.Fragment>
  );
}

export default ConnectWallet;
