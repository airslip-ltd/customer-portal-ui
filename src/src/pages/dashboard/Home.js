// material
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import AppWelcome from '../../components/_dashboard/general-app/AppWelcome';
import { PartnerHome } from '../../components/_dashboard/partner';
import { MerchantHome } from '../../components/_dashboard/merchant';

// ----------------------------------------------------------------------

export default function GeneralApp() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();

  return (
    <Page title="General | App | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <AppWelcome displayName={user.displayName} />
          </Grid>
          <Grid item xs={12}>
            {user.airslipUserType === 'Partner' && <PartnerHome />}
            {user.airslipUserType === 'Merchant' && <MerchantHome />}
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
