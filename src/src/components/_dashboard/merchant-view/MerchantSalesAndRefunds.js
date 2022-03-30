import { useEffect } from 'react';
import PropTypes from 'prop-types';
import MerchantDashboardSeries from './MerchantDashboardSeries';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getRevenueByYear } from '../../../redux/slices/analytics';
// hooks
import useDataOwner from '../../../hooks/useDataOwner';

// ----------------------------------------------------------------------

MerchantSalesAndRefunds.propTypes = {
  integrationId: PropTypes.string
};

export default function MerchantSalesAndRefunds({ integrationId }) {
  const dispatch = useDispatch();
  const { dataQuery } = useDataOwner();

  integrationId = integrationId || '';

  const { revenue } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(getRevenueByYear(dataQuery, 2022, integrationId));
  }, [dispatch, dataQuery, integrationId]);

  return <MerchantDashboardSeries title="Revenue and Refunds" apiRequest={revenue} />;
}
