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
import { BankIcon } from '../../components/_dashboard/account-list';

// ----------------------------------------------------------------------

export default function AccountLinked() {
  const { themeStretch } = useSettings();
  const { banks } = useParams();

  return (
    <Page title="Accounts | List | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Account Linked"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Accounts', href: PATH_DASHBOARD.accounts.root },
            { name: 'Linked' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <BankIcon icon={banks.bankId} />
              <Typography variant="subtitle2" noWrap>
                Great work! You have successfully linked your bank account.
              </Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
