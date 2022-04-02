import { useEffect } from 'react';
import PropTypes from 'prop-types';
import MerchantDashboardSeries from './MerchantDashboardSeries';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCashflow } from '../../../redux/slices/analytics';
// hooks
import useDataOwner from '../../../hooks/useDataOwner';
import useDateQuery from '../../../hooks/useDateQuery';

// ----------------------------------------------------------------------

CashflowByAccount.propTypes = {
  integrationId: PropTypes.string
};

export default function CashflowByAccount({ integrationId }) {
  const dispatch = useDispatch();
  const { dataOwnerQuery } = useDataOwner();
  const { dateQuery } = useDateQuery();

  const { cashflow } = useSelector((state) => state.analytics);

  useEffect(() => {
    dispatch(
      getCashflow({
        ...dateQuery,
        ...dataOwnerQuery,
        integrationId
      })
    );
  }, [dispatch, dataOwnerQuery, dateQuery, integrationId]);

  return <MerchantDashboardSeries title="Bank Cashflow" apiRequest={cashflow} />;
}
