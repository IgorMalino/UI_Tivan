import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import contracts from "../../../contracts";

const TVTAvailable = () => {
  const { t } = useTranslation();
  const [amount, setAmount] = useState(0);

  useEffect(async () => {
    const amount = await contracts.presale.methods.getTVTBalanceOf().call();

    setAmount(amount);
  }, []);

  return `${t("Available TVT")}: ${amount}`;
};

export default TVTAvailable;
