import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container, Grid } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { columns } from '../../lists/debt-service-coverage-ratio-list';
import { listData, totals } from '../../utils/demo-data/DebtServiceCoverageRatio';
import { StandardListClient, TotalSummary } from '../../components/_common/Lists';

// ----------------------------------------------------------------------

export default function DebtServiceCoverageRatioDetail() {
  const { themeStretch } = useSettings();
  const { accountId } = useParams();
  const [renderList, setRenderList] = useState({
    hasData: false
  });
  const [renderTotals, setRenderTotals] = useState([]);

  useEffect(() => {
    setRenderList(listData[accountId]);
    setRenderTotals(totals[accountId]);
  }, [setRenderList, setRenderTotals, accountId]);

  return (
    <>
      <Page title="Analytics | Debt Service Coverage Ratio | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Debt Service Coverage Ratio"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Analytics', href: PATH_DASHBOARD.analytics.root },
              { name: 'Debt Service Coverage Ratio' }
            ]}
          />

          {renderList.hasData && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StandardListClient columns={columns} details={renderList} recordsPerPage={10} />
              </Grid>
              <Grid item lg={6} md={6} sm={6} />
              <Grid item xs={6}>
                <TotalSummary totals={renderTotals} />
              </Grid>
            </Grid>
          )}
        </Container>
      </Page>
    </>
  );
}
