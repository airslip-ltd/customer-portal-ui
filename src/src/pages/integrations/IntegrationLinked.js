import { useParams } from 'react-router-dom';
// material
import { Container, Grid, Typography, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ProviderIcon } from '../../components/_dashboard/integration-list';

// ----------------------------------------------------------------------

export default function IntegrationLinked() {
  const { themeStretch } = useSettings();
  const { provider } = useParams();

  return (
    <Page title="Accounts | List | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Integrations Linked"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Integrations', href: PATH_DASHBOARD.integrations.root },
            { name: 'Linked' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <ProviderIcon icon={provider} />
              <Typography variant="subtitle2" noWrap>
                Great work! You have successfully linked your {provider} account.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}