// material
import { Grid } from '@mui/material';

// components
import { PartnerRiskFocus, IndustryExposure, ConnectedBusinesses, LatestBusinesses } from '.';

import { featureEnabled } from '../../../utils/feature-switch';

// ----------------------------------------------------------------------

export default function PartnerHome() {
  return (
    <Grid container spacing={3}>
      {featureEnabled('partner-risk-focus') && (
        <Grid item xs={8}>
          <PartnerRiskFocus />
        </Grid>
      )}
      {featureEnabled('connected-businesses') && (
        <Grid item xs={12} sm={6} md={4}>
          <ConnectedBusinesses />
        </Grid>
      )}
      {featureEnabled('connected-businesses') && (
        <Grid item xs={12} sm={6} md={8}>
          <LatestBusinesses />
        </Grid>
      )}
      {featureEnabled('industry-exposure') && (
        <Grid item xs={12}>
          <IndustryExposure />
        </Grid>
      )}
    </Grid>
  );
}
