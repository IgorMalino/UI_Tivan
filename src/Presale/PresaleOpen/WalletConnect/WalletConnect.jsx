import { useState } from "react";

import WalletList from "../../../components/WalletList/WalletList";

const WalletConnect = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleConnect = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button onClick={handleConnect}>
        <i className="fas fa-plug"></i> Connect Wallet
      </button>
      {isOpen && <WalletList onClose={handleClose} />}
    </>
  );
};

export default WalletConnect;
