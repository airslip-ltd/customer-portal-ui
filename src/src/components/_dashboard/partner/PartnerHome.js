// material
import { Grid } from '@mui/material';

// utils
import { featureEnabled } from '../../../utils/feature-switch';

// components
import { PartnerRiskFocus, IndustryExposure, CountryExposure, ImportantAlerts } from '.';

// ----------------------------------------------------------------------

export default function PartnerHome() {
  return (
    <Grid container spacing={3}>
      {featureEnabled('demo') && (
        <Grid item xs={12} md={8}>
          <IndustryExposure />
        </Grid>
      )}

      {featureEnabled('demo') && (
        <Grid item xs={12} md={8}>
          <CountryExposure />
        </Grid>
      )}

      {featureEnabled('demo') && (
        <Grid item xs={12} md={8}>
          <ImportantAlerts />
        </Grid>
      )}

      <Grid item xs={12}>
        <PartnerRiskFocus />
      </Grid>
    </Grid>
  );
}
