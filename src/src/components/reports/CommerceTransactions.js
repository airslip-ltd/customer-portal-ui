import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCommerceTransactions, downloadCommerceTransactions } from '../../redux/slices/commerce';
// hooks
import useDataOwner from '../../hooks/useDataOwner';
// components
import { columns } from '../../lists/commerce-transactions-report';
import StandardList from '../_common/Lists/StandardList';

// ----------------------------------------------------------------------

CommerceTransactions.propTypes = {
  integrationId: PropTypes.string,
  title: PropTypes.string
};

export default function CommerceTransactions({ integrationId, title }) {
  const dispatch = useDispatch();
  const { commerceTransactions } = useSelector((state) => state.commerce);
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
      getCommerceTransactions({
        ...newQuery,
        ...dataOwnerQuery
      })
    );
  };

  const handleDownload = () => {
    if (query) {
      dispatch(
        downloadCommerceTransactions({
          ...query,
          ...dataOwnerQuery
        })
      );
    }
  };

  return (
    <StandardList
      columns={columns}
      details={commerceTransactions}
      onChangeQuery={handleChangeQuery}
      onDownload={handleDownload}
      recordsPerPage={10}
      defaultSort="datetime"
      defaultFilter={filters}
      title={title}
    />
  );
}
