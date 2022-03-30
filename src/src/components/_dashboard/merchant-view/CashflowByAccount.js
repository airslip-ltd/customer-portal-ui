import { useEffect } from 'react';
import PropTypes from 'prop-types';
import MerchantDashboardSeries from './MerchantDashboardSeries';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCashflowByYear } from '../../../redux/slices/analytics';
// hooks
import useDataOwner from '../../../hooks/useDataOwner';

// ----------------------------------------------------------------------

CashflowByAccount.propTypes = {
  integrationId: PropTypes.string
};

export default function CashflowByAccount({ integrationId }) {
  const dispatch = useDispatch();
  const { dataQuery } = useDataOwner();

  integrationId = integrationId || '';

  const { cashflow } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(getCashflowByYear(dataQuery, 2022, integrationId));
  }, [dispatch, dataQuery, integrationId]);

  return <MerchantDashboardSeries title="Cashflow" apiRequest={cashflow} />;
}
