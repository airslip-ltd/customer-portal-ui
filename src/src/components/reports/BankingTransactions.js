import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBankTransactions, downloadBankTransactions } from '../../redux/slices/banking';
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
  const { bankTransactions } = useSelector((state) => state.banking);
  const [query, setQuery] = useState(null);
  const [filters, setFilters] = useState({
    columnField: 'integrationId',
    value: integrationId,
    operatorValue: 'equals'
  });
  const { dataOwnerQuery } = useDataOwner();

  useEffect(() => {
    setFilters({ columnField: 'integrationId', value: integrationId, operatorValue: 'equals' });
  }, [setFilters, integrationId]);

  const handleChangeQuery = (newQuery) => {
    if (!newQuery) return;
    setQuery(newQuery);
    dispatch(
      getBankTransactions({
        ...newQuery,
        ...dataOwnerQuery
      })
    );
  };

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
      onChangeQuery={handleChangeQuery}
      onDownload={handleDownload}
      recordsPerPage={10}
      defaultSort="capturedDate"
      defaultFilter={filters}
      title={title}
    />
  );
}
