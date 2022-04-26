import { useEffect, useState } from "react";

import { getContractByAddress, getTokenByAddress } from "../../../contracts";

const Balance = ({ account, address }) => {
  const [amount, setAmount] = useState(0);

  useEffect(async () => {
    const contract = getContractByAddress(address);

    const amount = await contract.methods.balanceOf(account).call();

    setAmount(amount);
  }, []);

  return (
    <div>
      Your {getTokenByAddress(address)} balance: {amount}
    </div>
  );
};

export default Balance;
