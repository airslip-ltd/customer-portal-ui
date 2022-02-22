// material
import { Grid } from '@mui/material';

// components
import { PartnerRiskFocus, IndustryExposure, ConnectedBusinesses, CountryExposure, ImportantAlerts } from '.';

// ----------------------------------------------------------------------

export default function PartnerHome() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={8}>
        <IndustryExposure />
      </Grid>
      <Grid item xs={4}>
        <ConnectedBusinesses />
      </Grid>
      <Grid item xs={12}>
        <PartnerRiskFocus />
      </Grid>
    </Grid>
  );
}
