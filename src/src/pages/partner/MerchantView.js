import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container, Grid } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getMerchantList } from '../../redux/slices/merchant';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { MerchantSummary, MerchantTitle } from '../../components/_dashboard/merchant-view';

// ----------------------------------------------------------------------

export default function MerchantView() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { merchantList } = useSelector((state) => state.merchant);
  const currentMerchant = merchantList.find((merchant) => merchant.id === id);

  useEffect(() => {
    dispatch(getMerchantList());
  }, [dispatch]);

  return (
    <Page title="Merchant | View | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading={currentMerchant ? currentMerchant.name : ''}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Merchants', href: PATH_DASHBOARD.partner.merchants.root },
            { name: currentMerchant ? currentMerchant.name : id }
          ]}
        />
      </Container>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MerchantTitle displayName={currentMerchant ? currentMerchant.name : ''} />
          </Grid>
          <Grid item xs={12}>
            <MerchantSummary currentMerchant={currentMerchant} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
