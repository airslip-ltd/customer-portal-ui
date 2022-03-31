import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCommerceTransactions, downloadCommerceTransactions } from '../../redux/slices/reports';
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
  const { commerceTransactions } = useSelector((state) => state.reports);
  const [query, setQuery] = useState(null);
  const { dataOwnerQuery } = useDataOwner();

  useEffect(() => {
    if (query) {
      dispatch(
        getCommerceTransactions({
          ...query,
          ...dataOwnerQuery
        })
      );
    }
  }, [dispatch, dataOwnerQuery, query]);

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
      onChangeQuery={setQuery}
      onDownload={handleDownload}
      recordsPerPage={10}
      defaultSort="datetime"
      defaultFilter={
        integrationId ? { columnField: 'integrationId', value: integrationId, operatorValue: 'equals' } : null
      }
      title={title}
    />
  );
}
