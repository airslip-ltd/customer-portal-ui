import { useState, useEffect } from 'react';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCommerceTransactions, downloadCommerceTransactions } from '../../redux/slices/reports';
// hooks
import useDataOwner from '../../hooks/useDataOwner';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { columns } from '../../lists/commerce-transactions-report';
import StandardList from '../../components/_common/Lists/StandardList';

// ----------------------------------------------------------------------

export default function CommerceTransactionsReport() {
  const dispatch = useDispatch();
  const { commerceTransactions } = useSelector((state) => state.reports);
  const [query, setQuery] = useState(null);
  const { ownerEntityId, ownerAirslipUserType } = useDataOwner();

  useEffect(() => {
    if (query) {
      query.ownerEntityId = ownerEntityId;
      query.ownerAirslipUserType = ownerAirslipUserType;
      dispatch(getCommerceTransactions(query));
    }
  }, [dispatch, ownerEntityId, ownerAirslipUserType, query]);

  const handleDownload = () => {
    if (query) {
      query.ownerEntityId = ownerEntityId;
      query.ownerAirslipUserType = ownerAirslipUserType;
      dispatch(downloadCommerceTransactions(query));
    }
  };

  return (
    <StandardPage
      area="Dashboard"
      space="Reports"
      spaceHref={PATH_DASHBOARD.reports.root}
      activity="Commerce Transactions"
      heading="Commerce Transactions"
      fullWidth
    >
      <StandardList
        columns={columns}
        details={commerceTransactions}
        onChangeQuery={setQuery}
        onDownload={handleDownload}
        recordsPerPage={10}
        defaultSort="datetime"
      />
    </StandardPage>
  );
}
