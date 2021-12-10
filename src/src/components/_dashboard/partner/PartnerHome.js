// material
import { Grid } from '@mui/material';
import { PartnerRiskFocus } from '.';

// ----------------------------------------------------------------------

export default function PartnerHome() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <PartnerRiskFocus />
      </Grid>
    </Grid>
  );
}
