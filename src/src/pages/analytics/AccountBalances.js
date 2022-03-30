import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
// components
import { Grid } from '@mui/material';
import { StandardList } from '../../components/_common/Lists';
import StandardPage from '../../layouts/StandardPage';
import { CashflowByAccount } from '../../components/_dashboard/merchant-view';
import { BankingTransactions } from '../../components/reports';
import { RelationshipHeading } from '../../components/_dashboard/relationship';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useDataOwner from '../../hooks/useDataOwner';
// lists
import { columns } from '../../lists/account-balances';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search } from '../../redux/slices/balances';

// ----------------------------------------------------------------------

export default function CommerceSummary() {
  const { dataQuery, buildOwnedPath } = useDataOwner();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { integrationId } = useParams();
  const { accountBalances } = useSelector((state) => state.balances);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query)
      dispatch(
        search({
          ...query,
          ...dataQuery
        })
      );
  }, [dispatch, query, dataQuery]);

  const handleRowClick = useCallback(
    (params) => {
      navigate(buildOwnedPath(`${PATH_DASHBOARD.analytics.accountBalances}/${params.id}`));
    },
    [navigate, buildOwnedPath]
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Analytics"
      spaceHref={PATH_DASHBOARD.analytics.root}
      activity="Account Balances"
      heading="Account Balances"
      fullWidth
    >
      <RelationshipHeading />
      <Grid container spacing={3} justify="center">
        <Grid item xs={12}>
          <StandardList
            columns={columns}
            details={accountBalances}
            onChangeQuery={setQuery}
            recordsPerPage={10}
            onRowSelected={handleRowClick}
            showToolbar={false}
            selectedRow={integrationId}
          />
        </Grid>

        {integrationId && (
          <Grid item xs={12}>
            <CashflowByAccount integrationId={integrationId} />
          </Grid>
        )}

        {integrationId && (
          <Grid item xs={12}>
            <BankingTransactions integrationId={integrationId} title="Account Transactions" />
          </Grid>
        )}
      </Grid>
    </StandardPage>
  );
}
