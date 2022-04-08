import * as React from 'react';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlug, faAddressCard } from "@fortawesome/free-solid-svg-icons"
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {connectors} from '../../Account/config'
import watchImg from '../../assets/img/cs.png'
import { useWeb3React } from '@web3-react/core';
import { getConnectFunctions } from '../../utils/getConnectFunctions';
import smalSize from '../../assets/img/smallSize.png'
import smalSizeLoading from '../../assets/img/smallSizeLoading.png'
import smalSizeClose from '../../assets/img/smallSizeClose.png'
// import { getEllipsisTxt } from "helpers/formatters"

import './connectWallet.css'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
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



export const ConnectWalletContent = ({handleClose}) => {
  const web3reactContext = useWeb3React();
  const {t} = useTranslation()
  const {
    connectBinanceWallet,
    connectWalletConnectSimple,
    connectCoinbaseSimple,
    connectMetamaskSimple
  } = getConnectFunctions(web3reactContext)


  const getConnector = (name) => {
    switch (name) {
      case "Metamask" :
        return connectMetamaskSimple
      case "Coinbase" :
        return connectCoinbaseSimple
      case "WalletConnect" :
        return connectWalletConnectSimple
      case "Binance" :
        return connectBinanceWallet
    }
  }

  return (
    <div className='ConnectWalletContent_wrapper'>
      <div className='ConnectWalletContent_modal'>
      <img className='ConnectWalletContent_img' src={smalSize} />
      <img className='ConnectWalletContent_img_loading' src={smalSizeLoading} />
      <img className='ConnectWalletContent_img_close' onClick={handleClose} src={smalSizeClose} />
      <div className='ConnectWalletContent_content'>
      <div>{t("Choose_wallet")}:</div>
        <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
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
                        <div  style={styles.connector}>
                          <img src={watchImg} alt="TokenPocket" style={styles.icon} />
                          <p style={{ fontSize: "14px" }}>{t("More_wallets_coming")}</p>
                        </div>
                      
        </div>
    
      </div>
      </div>
      
      
    </div>
  )
}

function ConnectWallet() {
  const [open, setOpen] = React.useState(false);
  const {account} = useWeb3React();
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {t} = useTranslation()

  const getEllipsisTxt = (str, number) => {
    const newStr = str.split("")
    return [...newStr.slice(0,number), "...", ...newStr.slice(newStr.length-number)].join('')
}

  console.log();

  return (
    <React.Fragment>
      {
        !account ? <Button id="connect-button" style={{color: "#00CCFF"}} onClick={handleOpen}><span><div><FontAwesomeIcon style={{marginRight: "5px", height:"16.5px"}} icon={faPlug} />{t("Connect")}</div></span></Button> : 
        <>
        <a className="social-icon" href="#"> <FontAwesomeIcon style={{marginRight:"5px"}} icon={faAddressCard} /> <span className="acc_long_adr">{getEllipsisTxt(account, 6)}</span> </a></>
      }
      
      
      

      {/* <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
          <Box sx={{ ...style, width: 200 }}>
          <Web3ReactConnectionComponent />
          <Button onClick={handleClose}>Close</Button>
          </Box>
      </Modal> */}
      {open && <ConnectWalletContent handleClose={handleClose} />}
      
      
    </React.Fragment>
  );
}

export default ConnectWallet
