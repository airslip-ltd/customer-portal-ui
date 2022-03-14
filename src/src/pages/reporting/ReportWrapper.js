import { useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
// hooks
import useAuth from '../../hooks/useAuth';
// components
import BankingTransactionsReport from './BankingTransactionsReport';
import CommerceTransactionsReport from './CommerceTransactionsReport';

// ----------------------------------------------------------------------

ReportWrapper.propTypes = {
  reportType: PropTypes.string.isRequired
};

export default function ReportWrapper({ reportType }) {
  const { memberDetails } = useAuth();
  const { airslipUserType, entityId } = useParams();

  const [reportEntityId] = useState(entityId || memberDetails.id);
  const [reportAirslipUserType] = useState(airslipUserType || memberDetails.airslipUserType);

  const Report = () => {
    switch (reportType) {
      case 'bank-transactions':
        return (
          <BankingTransactionsReport ownerEntityId={reportEntityId} ownerAirslipUserType={reportAirslipUserType} />
        );
      case 'commerce-transactions':
        return (
          <CommerceTransactionsReport ownerEntityId={reportEntityId} ownerAirslipUserType={reportAirslipUserType} />
        );
      default:
        return <></>;
    }
  };

  return <Report />;
}
