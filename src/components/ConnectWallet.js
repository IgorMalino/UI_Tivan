import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Web3ReactConnectionComponent from './Web3ReactConnectionComponent'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPlug } from "@fortawesome/free-solid-svg-icons"
import ContentWindow from './contentWindow/ContentWindow';
import {Link} from 'react-router-dom'
import {useTranslation} from 'react-i18next'
import {connectors} from '../Account/config'
import watchImg from '../assets/img/cs.png'

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

export const ConnectWalletContent = () => {

  const {t} = useTranslation()

  return (
    <>
    <div>{t("Choose_wallet")}:</div>
    <div style={{display:"grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
      {connectors.map(({ title, icon, connectorId }, key) => (
                        <div
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
    </>
  )
}

function ConnectWallet() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {t} = useTranslation()


  console.log();

  return (
    <React.Fragment>
      
      <Button id="connect-button" style={{color: "#00CCFF"}} onClick={handleOpen}><Link to="connectWallet"><div><FontAwesomeIcon style={{marginRight: "5px"}} icon={faPlug} />{t("Connect")}</div></Link></Button>
      
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
      
      
      
    </React.Fragment>
  );
}

export default ConnectWallet
