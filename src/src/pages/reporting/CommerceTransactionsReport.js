import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getCommerceTransactions, downloadCommerceTransactions } from '../../redux/slices/reports';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import StandardPage from '../../layouts/StandardPage';
import { columns } from '../../lists/commerce-transactions-report';
import StandardList from '../../components/_common/Lists/StandardList';

// ----------------------------------------------------------------------

CommerceTransactionsReport.propTypes = {
  ownerEntityId: PropTypes.string.isRequired,
  ownerAirslipUserType: PropTypes.string.isRequired
};

export default function CommerceTransactionsReport({ ownerEntityId, ownerAirslipUserType }) {
  const dispatch = useDispatch();
  const { commerceTransactions } = useSelector((state) => state.reports);
  const [query, setQuery] = useState(null);

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
