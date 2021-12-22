// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { PartnerRegisterForm } from '../../../components/_dashboard/admin';

// ----------------------------------------------------------------------

export default function MerchantLink() {
  const { themeStretch } = useSettings();

  return (
    <Page title="Airslip">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Register a new Partner"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Partners', href: PATH_DASHBOARD.admin.partners.root },
            { name: 'Register' }
          ]}
        />
        <PartnerRegisterForm />
      </Container>
    </Page>
  );
}
