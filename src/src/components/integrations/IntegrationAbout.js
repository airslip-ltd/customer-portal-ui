import PropTypes from 'prop-types';
// material
import { Card, CardHeader, CardContent } from '@mui/material';
import BankDetailSummary from './BankDetailSummary';
import CommerceDetailSummary from './CommerceDetailSummary';

// ----------------------------------------------------------------------

IntegrationAbout.propTypes = {
  integration: PropTypes.object
};

export default function IntegrationAbout({ integration }) {
  return (
    <Card>
      <CardHeader title="About" />

      <CardContent sx={{ pt: 1 }}>
        {integration.provider.integrationType === 'Banking' && (
          <BankDetailSummary accountDetail={integration.accountDetail} />
        )}
        {integration.provider.integrationType === 'Commerce' && <CommerceDetailSummary providerDetail={integration} />}
      </CardContent>
    </Card>
  );
}
