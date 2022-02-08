import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import getSymbolFromCurrency from 'currency-symbol-map';
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
import { BankSummary } from '../account-list';
// redux
import { getRecentCommerce } from '../../../redux/slices/transactions';
import { useDispatch, useSelector } from '../../../redux/store';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------
CommerceRecentTransactions.propTypes = {
  accountId: PropTypes.string
};
export default function CommerceRecentTransactions({ accountId }) {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const { recentCommerce } = useSelector((state) => state.transactions);

  accountId = accountId || '';

  useEffect(() => {
    dispatch(getRecentCommerce(accountId));
  }, [dispatch, accountId]);

  useEffect(() => {
    if (recentCommerce[accountId]) {
      setTransactions(recentCommerce[accountId].records);
    }
  }, [accountId, recentCommerce, setTransactions]);

  return (
    <Card>
      <CardHeader title="Latest Transactions" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Descriptipn</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.amount < 0 ? 'Refund' : 'Sale'}</TableCell>
                  <TableCell>
                    {getSymbolFromCurrency(row.currencyCode)}
                    {fCurrency(row.amount)}
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
