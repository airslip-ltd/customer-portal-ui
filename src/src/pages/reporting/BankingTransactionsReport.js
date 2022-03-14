import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBankTransactions } from '../../redux/slices/reports';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { columns } from '../../lists/bank-transactions-report';
import StandardList from '../../components/_common/Lists/StandardList';

// ----------------------------------------------------------------------

BankingTransactionsReport.propTypes = {
  ownerEntityId: PropTypes.string.isRequired,
  ownerAirslipUserType: PropTypes.string.isRequired
};

export default function BankingTransactionsReport({ ownerEntityId, ownerAirslipUserType }) {
  const dispatch = useDispatch();
  const { bankTransactions } = useSelector((state) => state.reports);
  const [query, setQuery] = useState(null);

  useEffect(() => {
    if (query) {
      query.ownerEntityId = ownerEntityId;
      query.ownerAirslipUserType = ownerAirslipUserType;
      dispatch(getBankTransactions(query));
    }
  }, [dispatch, ownerEntityId, ownerAirslipUserType, query]);

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
        recordsPerPage={10}
        defaultSort="capturedDate"
      />
    </StandardPage>
  );
}
