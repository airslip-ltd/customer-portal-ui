import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import {
  Box,
  Card,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  TableHead,
  CardHeader,
  TableContainer
} from '@mui/material';
import ReactTimeAgo from 'react-time-ago';
import { BankSummary } from '../../components/_dashboard/account-list';

// utils
import { fCurrency } from '../../utils/formatNumber';
import Scrollbar from '../../components/Scrollbar';

import { demoData } from '../../utils/demo-data/BankRecentTransactions';

// ----------------------------------------------------------------------
BankingRecentTransactions.propTypes = {
  accountId: PropTypes.string
};
export default function BankingRecentTransactions({ accountId }) {
  const [metricData, setMetricData] = useState({});
  accountId = accountId || 'my-account-1';

  useEffect(() => {
    if (!demoData[accountId] || !demoData[accountId].transactions) return;
    setMetricData(demoData[accountId]);
  }, [accountId, setMetricData]);

  // const dispatch = useDispatch();
  // const [transactions, setTransactions] = useState([]);
  // const { recentBanking } = useSelector((state) => state.transactions);

  // accountId = accountId || '';

  // useEffect(() => {
  //   dispatch(getRecentBanking(accountId));
  // }, [dispatch, accountId]);

  // useEffect(() => {
  //   if (recentBanking[accountId]) {
  //     setTransactions(recentBanking[accountId].records);
  //   }
  // }, [accountId, recentBanking, setTransactions]);

  return (
    <Card>
      <CardHeader title="Incoming Transactions" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Bank Account</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {metricData.transactions &&
                metricData.transactions.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.customer}</TableCell>

                    <TableCell>{row.amount < 0 ? 'Outgoing' : 'Incoming'}</TableCell>
                    <TableCell>{fCurrency(row.amount)}</TableCell>
                    <TableCell>
                      <BankSummary institutionId={row.source} />
                    </TableCell>
                    <TableCell>
                      <ReactTimeAgo date={row.capturedDate} locale="en-US" />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Scrollbar>

      <Divider />

      <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          to="#"
          size="small"
          color="inherit"
          component={RouterLink}
          endIcon={<Icon icon={arrowIosForwardFill} />}
        >
          View All
        </Button>
      </Box>
    </Card>
  );
}
