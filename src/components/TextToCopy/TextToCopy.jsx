import React, { useState } from "react";

import Copied from "./Copied";
import Copy from "./Copy";

const TextToCopy = ({ className, value }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(value);

    setIsCopied(true);
  };

  return (
    <div className={className || ""}>
      {value}
      {isCopied ? <Copied /> : <Copy onClick={handleCopy} />}
    </div>
  );
};

export default TextToCopy;
