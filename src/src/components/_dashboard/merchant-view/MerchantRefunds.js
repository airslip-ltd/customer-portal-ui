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
import useCurrencyQuery from '../../../hooks/useCurrencyQuery';

// ----------------------------------------------------------------------
MerchantRefunds.propTypes = {
  accountId: PropTypes.string
};

export default function MerchantRefunds({ accountId }) {
  const dispatch = useDispatch();
  const { refundStats } = useSelector((state) => state.analytics);
  const { dataOwnerQuery, buildOwnedPath } = useDataOwner();
  const { currencyQuery, initialised } = useCurrencyQuery();
  accountId = accountId || '';

  useEffect(() => {
    if (!initialised) return;
    dispatch(
      getRefundShapshot(
        {
          ...dataOwnerQuery,
          ...currencyQuery
        },
        30,
        accountId
      )
    );
  }, [dispatch, dataOwnerQuery, currencyQuery, initialised, accountId]);

  return (
    <MerchantDashboardSnapshot
      title="Refunds (Last 30 days)"
      snapshot={refundStats}
      navigateTo={buildOwnedPath(PATH_DASHBOARD.analytics.commerceSummary)}
    />
  );
}
