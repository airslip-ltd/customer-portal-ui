// material
import { Grid, Typography } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import ProviderSelection from '../../components/integrations/ProviderSelection';
import StandardPage from '../../layouts/StandardPage';

// ----------------------------------------------------------------------

export default function IntegrationCreate() {
  return (
    <StandardPage
      area="Dashboard"
      space="Services"
      spaceHref={PATH_DASHBOARD.integrations.root}
      activity="Connect a Service"
      heading="Connect a Service"
      fullWidth
    >
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <Typography variant="body" sx={{ color: 'text.secondary' }}>
            Let's connect your accounts. By connecting your banking, accounting or commerce or accounts, you can get
            access to actionable insights and get access to more financial products.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <ProviderSelection />
        </Grid>
      </Grid>
    </StandardPage>
  );
}
