import React, { useState } from "react";

import Copied from "./Copied";
import Copy from "./Copy";

const Address = ({ value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setIsCopied(true);

    setTimeout(() => {
      setIsCopied(false);
    }, 10000);
  };

  return (
    <div>
      {value}
      {isCopied ? <Copied /> : <Copy onClick={handleCopy} />}
    </div>
  );
};

export default Address;
