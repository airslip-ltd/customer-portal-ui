// material
import { Container, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/debt-to-capital-ratio-list';
import { listData, totals } from '../../utils/demo-data/DebtToCapitalRatio';
import { StandardListClient, TotalSummary } from '../../components/_common/Lists';

// ----------------------------------------------------------------------

export default function DebtServiceCoverageRatioDetail() {
  const { themeStretch } = useSettings();

  return (
    <>
      <Page title="Analytics | Debt To Capital Ratio | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Debt To Capital Ratio"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Analytics', href: PATH_DASHBOARD.analytics.root },
              { name: 'Debt To Capital Ratio' }
            ]}
          />
          <Grid container xs={12} spacing={3}>
            <Grid item xs={12}>
              <StandardListClient columns={columns} details={listData} recordsPerPage={10} />
            </Grid>
            <Grid item lg={6} md={6} sm={6} />
            <Grid item xs={6}>
              <TotalSummary totals={totals} />
            </Grid>
          </Grid>
        </Container>
      </Page>
    </>
  );
}
