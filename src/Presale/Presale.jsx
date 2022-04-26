import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import contracts from "../contracts";

import PresaleOpen from "./PresaleOpen/PresaleOpen";

const Presale = () => {
  const { t } = useTranslation();
  const [isClosed, setIsClosed] = useState();

  useEffect(async () => {
    const paused = await contracts.presale.methods.Paused().call();

    setIsClosed(paused);
  }, []);

  if (isClosed === true) {
    return t("PRESALE CLOSED");
  }

  if (isClosed === false) {
    return <PresaleOpen />;
  }

  return t("Loading");
};

export default Presale;
