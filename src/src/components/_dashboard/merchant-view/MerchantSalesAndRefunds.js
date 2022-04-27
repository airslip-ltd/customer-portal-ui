import { useEffect } from 'react';
import PropTypes from 'prop-types';
import MerchantDashboardSeries from './MerchantDashboardSeries';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getRevenue } from '../../../redux/slices/analytics';
// hooks
import useDataOwner from '../../../hooks/useDataOwner';
import useDateQuery from '../../../hooks/useDateQuery';
import useCurrencyQuery from '../../../hooks/useCurrencyQuery';

// ----------------------------------------------------------------------

MerchantSalesAndRefunds.propTypes = {
  integrationId: PropTypes.string
};

export default function MerchantSalesAndRefunds({ integrationId }) {
  const dispatch = useDispatch();
  const { dataOwnerQuery } = useDataOwner();
  const { dateQuery } = useDateQuery();
  const { currencyQuery, initialised } = useCurrencyQuery();

  const { revenue } = useSelector((state) => state.analytics);

  useEffect(() => {
    if (!initialised) return;
    dispatch(
      getRevenue({
        ...dateQuery,
        ...dataOwnerQuery,
        ...currencyQuery,
        integrationId
      })
    );
  }, [dispatch, dataOwnerQuery, dateQuery, integrationId, initialised, currencyQuery]);

  return <MerchantDashboardSeries title="Commerce Sales Performance" apiRequest={revenue} />;
}
