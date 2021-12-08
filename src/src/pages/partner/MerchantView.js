import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container, Grid, Stack } from '@mui/material';
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
import {
  MerchantRevenue,
  MerchantRefunds,
  MerchantInterestCharges,
  MerchantPaymentMethods,
  MerchantSalesAndRefunds,
  MerchantRecentTransactions,
  MerchantTitle,
  MerchantRiskScore
} from '../../components/_dashboard/merchant-view';

// ----------------------------------------------------------------------

export default function UserCreate() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { merchantList } = useSelector((state) => state.merchant);
  const { name, rating } = merchantList.find((merchant) => merchant.id === id);

  useEffect(() => {
    dispatch(getMerchantList());
  }, [dispatch]);

  return (
    <Page title="Merchant | View | Airslip">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Merchant View"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Merchants', href: PATH_DASHBOARD.merchants.root },
            { name }
          ]}
        />

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MerchantTitle displayName={name} />
          </Grid>

          <Grid item xs={12} md={4}>
            <MerchantRevenue />
          </Grid>

          <Grid item xs={12} md={4}>
            <MerchantRefunds />
          </Grid>

          <Grid item xs={12} md={4}>
            <MerchantInterestCharges />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <MerchantRiskScore rating={rating} />
              <MerchantPaymentMethods />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <MerchantSalesAndRefunds />
          </Grid>

          <Grid item xs={12}>
            <MerchantRecentTransactions />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
