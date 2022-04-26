import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import contracts from "../../../contracts";

const TVTSold = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(0);

  useEffect(async () => {
    const amount = await contracts.presale.methods.TotalTokensSold().call();

    setAmount(amount);
  }, []);

  return `${t("Sold TVT")}: ${amount}`;
};

export default TVTSold;
