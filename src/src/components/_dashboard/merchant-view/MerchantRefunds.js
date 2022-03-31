import { useEffect } from 'react';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getRefundShapshot } from '../../../redux/slices/analytics';
// utils
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useDataOwner from '../../../hooks/useDataOwner';

// ----------------------------------------------------------------------
MerchantRefunds.propTypes = {
  accountId: PropTypes.string
};

export default function MerchantRefunds({ accountId }) {
  const dispatch = useDispatch();
  const { salesStats } = useSelector((state) => state.analytics);
  const { dataOwnerQuery, buildOwnedPath } = useDataOwner();
  accountId = accountId || '';

  useEffect(() => {
    dispatch(getRefundShapshot(dataOwnerQuery, 30, accountId));
  }, [dispatch, dataOwnerQuery, accountId]);

  return (
    <MerchantDashboardSnapshot
      title="Refunds"
      snapshot={salesStats}
      navigateTo={buildOwnedPath(PATH_DASHBOARD.analytics.commerceSummary)}
    />
  );
}
