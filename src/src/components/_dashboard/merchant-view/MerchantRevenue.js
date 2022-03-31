import { useEffect } from 'react';
import PropTypes from 'prop-types';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getSalesShapshot } from '../../../redux/slices/analytics';
// utils
import MerchantDashboardSnapshot from './MerchantDashboardSnapshot';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useDataOwner from '../../../hooks/useDataOwner';

// ----------------------------------------------------------------------
MerchantRevenue.propTypes = {
  accountId: PropTypes.string
};

export default function MerchantRevenue({ accountId }) {
  const dispatch = useDispatch();
  const { salesStats } = useSelector((state) => state.analytics);
  const { dataOwnerQuery, buildOwnedPath } = useDataOwner();
  accountId = accountId || '';

  useEffect(() => {
    dispatch(getSalesShapshot(dataOwnerQuery, 30, accountId));
  }, [dispatch, dataOwnerQuery, accountId]);

  return (
    <MerchantDashboardSnapshot
      title="Revenue"
      snapshot={salesStats}
      navigateTo={buildOwnedPath(PATH_DASHBOARD.analytics.commerceSummary)}
    />
  );
}
