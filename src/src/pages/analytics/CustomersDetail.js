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
import { columns } from '../../lists/customers-list';
import { listData } from '../../utils/demo-data/CustomersDetail';
import { StandardListClient } from '../../components/_common/Lists';

// ----------------------------------------------------------------------

export default function CustomersDetail() {
  const { themeStretch } = useSettings();
  const { accountId } = useParams();
  const [renderList, setRenderList] = useState({
    complete: false
  });

  useEffect(() => {
    setRenderList(listData[accountId]);
  }, [setRenderList, accountId]);

  return (
    <>
      <Page title="Analytics | Customers | Airslip">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <HeaderBreadcrumbs
            heading="Customers"
            links={[
              { name: 'Dashboard', href: PATH_DASHBOARD.root },
              { name: 'Analytics', href: PATH_DASHBOARD.analytics.root },
              { name: 'Customers' }
            ]}
          />

          {renderList.complete && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <StandardListClient columns={columns} details={renderList} recordsPerPage={10} />
              </Grid>
            </Grid>
          )}
        </Container>
      </Page>
    </>
  );
}
