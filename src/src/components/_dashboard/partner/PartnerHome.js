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
      {featureEnabled('partner-risk-focus') && (
        <Grid item xs={8}>
          <PartnerRiskFocus />
        </Grid>
      )}
      {featureEnabled('connected-businesses') && (
        <Grid item xs={4}>
          <ConnectedBusinesses />
        </Grid>
      )}
    </Grid>
  );
}
