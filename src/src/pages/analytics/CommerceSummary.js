import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
// components
import { Stack } from '@mui/material';
import StandardPage from '../../layouts/StandardPage';
import { StandardList } from '../../components/_common/Lists';
import { MerchantSalesAndRefunds } from '../../components/_dashboard/merchant-view';
import { CommerceTransactions } from '../../components/reports';
import { RelationshipHeading } from '../../components/_dashboard/relationship';
// contexts
import { CurrencySelectionProvider, DateSelectionProvider } from '../../contexts';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useDataOwner from '../../hooks/useDataOwner';
// demo data
import { columns } from '../../lists/commerce-summary';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search } from '../../redux/slices/commerce';

// ----------------------------------------------------------------------

export default function CommerceSummary() {
  const { dataOwnerQuery, buildOwnedPath } = useDataOwner();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { integrationId } = useParams();
  const { commerceAccounts } = useSelector((state) => state.commerce);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query)
      dispatch(
        search({
          ...query,
          ...dataOwnerQuery
        })
      );
  }, [dispatch, query, dataOwnerQuery]);

  const handleRowClick = useCallback(
    (params) => {
      console.log(params);
      navigate(buildOwnedPath(`${PATH_DASHBOARD.analytics.commerceSummary}/${params.id}`));
    },
    [navigate, buildOwnedPath]
  );

  return (
    <StandardPage
      area="Dashboard"
      space="Analytics"
      spaceHref={PATH_DASHBOARD.analytics.root}
      activity="Commerce Summary"
      heading="Commerce Summary"
      fullWidth
    >
      <RelationshipHeading />
      <Stack spacing={3}>
        <StandardList
          columns={columns}
          details={commerceAccounts}
          onChangeQuery={setQuery}
          recordsPerPage={10}
          onRowSelected={handleRowClick}
          showToolbar={false}
          selectedRow={integrationId}
        />

        {integrationId && (
          <CurrencySelectionProvider selectable>
            <Stack spacing={3}>
              <DateSelectionProvider>
                <MerchantSalesAndRefunds integrationId={integrationId} />
              </DateSelectionProvider>

              <CommerceTransactions integrationId={integrationId} title="Commerce Transactions" />
            </Stack>
          </CurrencySelectionProvider>
        )}
      </Stack>
    </StandardPage>
  );
}
