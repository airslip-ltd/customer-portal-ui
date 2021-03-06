import { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
// components
import { Stack } from '@mui/material';
import { StandardList } from '../../components/_common/Lists';
import StandardPage from '../../layouts/StandardPage';
import { CashflowByAccount } from '../../components/_dashboard/merchant-view';
import { BankingTransactions } from '../../components/reports';
import { RelationshipHeading } from '../../components/_dashboard/relationship';
// contexts
import { CurrencySelectionProvider, DateSelectionProvider } from '../../contexts';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useDataOwner from '../../hooks/useDataOwner';
// lists
import { columns } from '../../lists/account-balances';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { searchBalances } from '../../redux/slices/banking';

// ----------------------------------------------------------------------

export default function CommerceSummary() {
  const { dataOwnerQuery, buildOwnedPath } = useDataOwner();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { integrationId, currencyCode } = useParams();
  const { accountBalances } = useSelector((state) => state.banking);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (!dataOwnerQuery.ownerEntityId) return;
    if (query)
      dispatch(
        searchBalances({
          ...query,
          ...dataOwnerQuery
        })
      );
  }, [dispatch, query, dataOwnerQuery]);

  const handleRowClick = useCallback(
    (params) => {
      navigate(buildOwnedPath(`${PATH_DASHBOARD.analytics.accountBalances}/${params.id}/${params.row.currencyCode}`));
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
      <CurrencySelectionProvider defaultCurrency={currencyCode}>
        <RelationshipHeading />
        <Stack spacing={3}>
          <StandardList
            columns={columns}
            details={accountBalances}
            onChangeQuery={setQuery}
            recordsPerPage={10}
            onRowSelected={handleRowClick}
            showToolbar={false}
            selectedRow={integrationId}
          />

          {integrationId && (
            <Stack spacing={3}>
              <DateSelectionProvider>
                <CashflowByAccount integrationId={integrationId} />
              </DateSelectionProvider>

              <BankingTransactions integrationId={integrationId} title="Account Transactions" />
            </Stack>
          )}
        </Stack>
      </CurrencySelectionProvider>
    </StandardPage>
  );
}
