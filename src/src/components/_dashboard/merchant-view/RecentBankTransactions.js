import PropTypes from 'prop-types';
import { Box, Card, CardHeader } from '@mui/material';
// redux
import { transactionsByAccount } from '../../../utils/demo-data/AccountBalances';
// utils
import { StandardListClientNoCard } from '../../_common/Lists';
import { columns } from '../../../lists/recent-bank-transactions';

// ----------------------------------------------------------------------
RecentBankTransactions.propTypes = {
  accountId: PropTypes.string
};
export default function RecentBankTransactions({ accountId }) {
  const transactions = transactionsByAccount[accountId];

  return (
    <Card>
      <CardHeader title="Latest Transactions" sx={{ mb: 3 }} />
      <Box sx={{ p: 3 }}>
        <StandardListClientNoCard columns={columns} details={transactions} recordsPerPage={12} />
      </Box>
    </Card>
  );
}
