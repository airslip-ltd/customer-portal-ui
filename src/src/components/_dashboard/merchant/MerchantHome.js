// material
import { Grid } from '@mui/material';
// components
import { MerchantSummary } from '../merchant-view';

// ----------------------------------------------------------------------

export default function MerchantHome() {
  const currentMerchant = {};

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MerchantSummary currentMerchant={currentMerchant} />
      </Grid>
    </Grid>
  );
}
