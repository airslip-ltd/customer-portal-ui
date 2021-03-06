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
import useCurrencyQuery from '../../../hooks/useCurrencyQuery';

// ----------------------------------------------------------------------
MerchantRevenue.propTypes = {
  accountId: PropTypes.string
};

export default function MerchantRevenue({ accountId }) {
  const dispatch = useDispatch();
  const { salesStats } = useSelector((state) => state.analytics);
  const { dataOwnerQuery, buildOwnedPath } = useDataOwner();
  const { currencyQuery, initialised } = useCurrencyQuery();
  accountId = accountId || '';

  useEffect(() => {
    if (!initialised) return;
    dispatch(
      getSalesShapshot(
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
      title="Revenue (Last 30 days)"
      snapshot={salesStats}
      navigateTo={buildOwnedPath(PATH_DASHBOARD.analytics.commerceSummary)}
    />
  );
}
