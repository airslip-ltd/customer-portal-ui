// material
import { Grid } from '@mui/material';

// components
import { PartnerRiskFocus, IndustryExposure, ConnectedBusinesses } from '.';

import { featureEnabled } from '../../../utils/feature-switch';

// ----------------------------------------------------------------------

export default function PartnerHome() {
  return (
    <Grid container spacing={3}>
      {featureEnabled('industry-exposure') && (
        <Grid item xs={12}>
          <IndustryExposure />
        </Grid>
      )}
      <Grid item xs={8}>
        <PartnerRiskFocus />
      </Grid>
      <Grid item xs={4}>
        <ConnectedBusinesses />
      </Grid>
    </Grid>
  );
}
