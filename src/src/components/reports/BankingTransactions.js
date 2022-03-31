import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBankTransactions, downloadBankTransactions } from '../../redux/slices/reports';
// hooks
import useDataOwner from '../../hooks/useDataOwner';
// components
import { columns } from '../../lists/bank-transactions-report';
import StandardList from '../_common/Lists/StandardList';

// ----------------------------------------------------------------------

BankingTransactions.propTypes = {
  integrationId: PropTypes.string,
  title: PropTypes.string
};

export default function BankingTransactions({ integrationId, title }) {
  const dispatch = useDispatch();
  const { bankTransactions } = useSelector((state) => state.reports);
  const [query, setQuery] = useState(null);
  const { dataOwnerQuery } = useDataOwner();

  useEffect(() => {
    if (query) {
      dispatch(
        getBankTransactions({
          ...query,
          ...dataOwnerQuery
        })
      );
    }
  }, [dispatch, dataOwnerQuery, query]);

  const handleDownload = () => {
    if (query) {
      dispatch(
        downloadBankTransactions({
          ...query,
          ...dataOwnerQuery
        })
      );
    }
  };

  return (
    <StandardList
      columns={columns}
      details={bankTransactions}
      onChangeQuery={setQuery}
      onDownload={handleDownload}
      recordsPerPage={10}
      defaultSort="capturedDate"
      defaultFilter={
        integrationId ? { columnField: 'integrationId', value: integrationId, operatorValue: 'equals' } : null
      }
      title={title}
    />
  );
}
