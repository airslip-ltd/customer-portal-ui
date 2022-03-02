// material
import { Container, Grid, Typography } from '@mui/material';

// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import ProviderSelection from '../../components/_dashboard/integration-list/ProviderSelection';
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

export default function IntegrationLink() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Integrations | Link | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Connect Integration"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Commerce', href: PATH_DASHBOARD.integrations.root },
            { name: 'Link' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography noWrap variant="body" sx={{ color: 'text.secondary' }}>
              Let's connect a commerce and accounting provider. By connecting your commerce and accounting providers,
              you can visualise your data to make improved decisions and get access to more financial products.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <ProviderSelection />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
