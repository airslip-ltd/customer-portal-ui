import { useEffect } from 'react';
import PropTypes from 'prop-types';
import MerchantDashboardSeries from './MerchantDashboardSeries';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getRevenue } from '../../../redux/slices/analytics';
// hooks
import useDataOwner from '../../../hooks/useDataOwner';
import useDateQuery from '../../../hooks/useDateQuery';

// ----------------------------------------------------------------------

MerchantSalesAndRefunds.propTypes = {
  integrationId: PropTypes.string
};

export default function MerchantSalesAndRefunds({ integrationId }) {
  const dispatch = useDispatch();
  const { dataOwnerQuery } = useDataOwner();
  const { dateQuery } = useDateQuery();

  const { revenue } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(
      getRevenue({
        ...dateQuery,
        ...dataOwnerQuery,
        integrationId
      })
    );
  }, [dispatch, dataOwnerQuery, dateQuery, integrationId]);

  return <MerchantDashboardSeries title="Sales and Refunds" apiRequest={revenue} />;
}
