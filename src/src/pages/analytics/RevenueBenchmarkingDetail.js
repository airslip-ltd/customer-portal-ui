// material
import { Container, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/revenue-benchmarking-detail';
import { chartDataFull, listData } from '../../utils/demo-data/RevenueGrowthBenchmarking';
import { StandardListClient } from '../../components/_common/Lists';
import MerchantDashboardSeries from '../../components/_dashboard/merchant-view/MerchantDashboardSeries';

// ----------------------------------------------------------------------

export default function RevenueBenchmarkingDetail() {
  const { themeStretch } = useSettings();

  return (
    <>
      <Page title="Analytics | Revenue Benchmarking | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Revenue Benchmarking"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Analytics', href: PATH_DASHBOARD.analytics.root },
              { name: 'Revenue Benchmarking' }
            ]}
          />
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <MerchantDashboardSeries title="Revenue Benchmarking" stats={chartDataFull} />
            </Grid>
            <Grid item xs={12}>
              <StandardListClient columns={columns} details={listData} recordsPerPage={12} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
}
