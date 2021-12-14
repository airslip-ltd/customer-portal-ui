// material
import { Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import PartnerInviteForm from '../../components/_dashboard/partner/PartnerInviteForm';

// ----------------------------------------------------------------------

export default function MerchantLink() {
  const { themeStretch } = useSettings();

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Invite a new Merchant"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Merchants', href: PATH_DASHBOARD.partner.merchants.root },
            { name: 'Invite' }
          ]}
        />
        <PartnerInviteForm />
      </Container>
    </Page>
  );
}
