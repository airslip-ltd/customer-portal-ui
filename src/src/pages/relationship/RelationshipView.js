import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container, Grid } from '@mui/material';
// redux
import { listData } from '../../utils/demo-data/PartnerRiskFocus';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { MerchantSummary, MerchantTitle } from '../../components/_dashboard/merchant-view';

// ----------------------------------------------------------------------

export default function RelationshipView() {
  const { themeStretch } = useSettings();
  const { id } = useParams();
  const currentBusiness = listData.response.results.find((merchant) => merchant.id === id);

  return (
    <Page title="Merchant | View | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={currentBusiness ? currentBusiness.name : ''}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Relationships', href: PATH_DASHBOARD.relationship.root },
            { name: currentBusiness ? currentBusiness.name : id }
          ]}
        />
      </Container>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MerchantTitle displayName={currentBusiness ? currentBusiness.name : ''} />
          </Grid>
          <Grid item xs={12}>
            <MerchantSummary currentMerchant={currentBusiness} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
