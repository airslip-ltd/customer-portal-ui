import { useState, useEffect } from 'react';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBankTransactions, downloadBankTransactions } from '../../redux/slices/reports';
// hooks
import useDataOwner from '../../hooks/useDataOwner';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { columns } from '../../lists/bank-transactions-report';
import StandardList from '../../components/_common/Lists/StandardList';

// ----------------------------------------------------------------------

export default function BankingTransactionsReport() {
  const dispatch = useDispatch();
  const { bankTransactions } = useSelector((state) => state.reports);
  const [query, setQuery] = useState(null);
  const { ownerEntityId, ownerAirslipUserType } = useDataOwner();

  useEffect(() => {
    if (query) {
      query.ownerEntityId = ownerEntityId;
      query.ownerAirslipUserType = ownerAirslipUserType;
      dispatch(getBankTransactions(query));
    }
  }, [dispatch, ownerEntityId, ownerAirslipUserType, query]);

  const handleDownload = () => {
    if (query) {
      query.ownerEntityId = ownerEntityId;
      query.ownerAirslipUserType = ownerAirslipUserType;
      dispatch(downloadBankTransactions(query));
    }
  };

  return (
    <StandardPage
      area="Dashboard"
      space="Reports"
      spaceHref={PATH_DASHBOARD.reports.root}
      activity="Bank Transactions"
      heading="Bank Transactions"
      fullWidth
    >
      <StandardList
        columns={columns}
        details={bankTransactions}
        onChangeQuery={setQuery}
        onDownload={handleDownload}
        recordsPerPage={10}
        defaultSort="capturedDate"
      />
    </StandardPage>
  );
}
