import { Box, Grid } from "@mui/material";

const Total = ({ values }) => {
  return (
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
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          Out USDT:
        </Grid>
        <Grid item xs={6}>
          {values.busd}
        </Grid>
        <Grid item xs={6}>
          In TVT:
        </Grid>
        <Grid item xs={6}>
          {values.tvt}
        </Grid>
        <Grid item xs={6}>
          Referral bonus:
        </Grid>
        <Grid item xs={6}>
          {values.ref_bonus_total} ({values.ref_bonus_perc}%)
        </Grid>
        <Grid item xs={6}>
          Total TVT:
        </Grid>
        <Grid item xs={6}>
          {values.total_get_tvt}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Total;
