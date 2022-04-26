import { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";

import { ThemeProvider } from "@mui/material/styles";
import { Box, Grid, MenuItem, Select, TextField } from "@mui/material";

import contracts, { getTokenByAddress } from "../../contracts";

import Balance from "./Balance/Balance";
import NumberField from "./NumberField/NumberField";
import TVTAvailable from "./TVTAvailable/TVTAvailable";
import TVTSold from "./TVTSold/TVTSold";
import WalletConnect from "./WalletConnect/WalletConnect";

import theme from "./theme";

const PresaleOpen = () => {
  const [isReferralAvailable, setIsReferralAvailable] = useState(false);
  const [referralCondition, setReferralCondition] = useState({
    status: false,
    referral: 0,
    referrer: 0,
  });
  const [minAmount, setMinAmount] = useState();
  const [tokens, setTokens] = useState([]);
  const [values, setValues] = useState({
    amount: 0,
    contract: "",
    refferer: "",
    tvt: 0,
  });

  const { account } = useWeb3React();

  useEffect(async () => {
    contracts.presale.methods
      .referBont()
      .call()
      .then(({ status, A, B }) =>
        setReferralCondition({
          status,
          referral: (A / 10).toFixed(1),
          referrer: (B / 10).toFixed(1),
        })
      );
    contracts.presale.methods
      .ReferalStatus()
      .call()
      .then(setIsReferralAvailable);
    contracts.presale.methods.getAllPairs().call().then(setTokens);
    contracts.presale.methods.minAmountOut().call().then(setMinAmount);
  }, []);

  const handleApprove = () => {
    debugger;
  };

  const handleBuy = () => {
    debugger;
  };

  const handleChange = ({ target }) => {
    values[target.name] = target.value;

    if (target.name === "contract") {
      values["rate"] = tokens.find(
        ({ w_address }) => target.value === w_address
      );

      values["token"] = getTokenByAddress(target.value);
    }

    setValues(values);
  };

  const renderButton = () => {
    if (!account) {
      return <WalletConnect />;
    }

    if (values.process === "buying") {
      return <button onClick={handleBuy}>BUY TVT</button>;
    }

    if (values.process === "approving") {
      return <button onClick={handleApprove}>Approve</button>;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <TVTAvailable /> | <TVTSold />
      <Select
        name="contract"
        value={values.contract}
        label="Token"
        onChange={handleChange}
      >
        {tokens.map(({ w_address }) => (
          <MenuItem key={w_address} value={w_address}>
            {getTokenByAddress(w_address)}
          </MenuItem>
        ))}
      </Select>
      {isReferralAvailable && (
        <TextField
          label="Refferer address (optional)"
          name="refferer"
          onChange={handleChange}
          value={values.refferer}
        />
      )}
      {values.contract ? (
        <>
          <div>
            <p>1 TVT = {values.rate.A / values.rate.B}</p>
            <p>
              {values.token} | min TVT: {minAmount}
            </p>
          </div>
          {account && <Balance account={account} address={values.contract} />}

          <TextField
            focused
            label={values.token}
            name="amount"
            onChange={handleChange}
            value={values.amount}
            InputProps={{
              inputComponent: NumberField,
            }}
          />

          <div>
            <i className="fas fa-arrow-circle-down"></i>
          </div>

          <TextField
            label="TVT"
            name="tvt"
            onChange={handleChange}
            value={values.tvt}
            InputProps={{
              inputComponent: NumberField,
            }}
          />

          <div>
            <i className="fas fa-arrow-circle-up"></i>
            <i className="fas fa-users"></i>
            <i className="fas fa-arrow-circle-down"></i>
          </div>

          <Box
            component="div"
            sx={{
              p: 2,
              border: "1px dashed grey",
              width: "50%",
              ml: "auto",
              mr: "auto",
              textAlign: "left",
              fontSize: "9pt",
            }}
          >
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={6}>
                Out {values.token}:
              </Grid>
              <Grid item xs={6}>
                {values.amount}
              </Grid>
              <Grid item xs={6}>
                In TVT:
              </Grid>
              <Grid item xs={6}>
                {values.tvt}
              </Grid>
              {isReferralAvailable && (
                <>
                  <Grid item xs={6}>
                    Referral bonus:
                  </Grid>
                  <Grid item xs={6}>
                    {(values.tvt * referralCondition.referrer) / 100} (
                    {referralCondition.referrer}%)
                  </Grid>
                  <Grid item xs={6}>
                    Total TVT:
                  </Grid>
                  <Grid item xs={6}>
                    {values.tvt +
                      (values.tvt * referralCondition.referrer) / 100}
                  </Grid>
                </>
              )}
            </Grid>
          </Box>
        </>
      ) : null}
      {renderButton()}
    </ThemeProvider>
  );
};

export default PresaleOpen;
