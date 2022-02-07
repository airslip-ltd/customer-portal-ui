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
import { getRecentTransactions } from '../../../redux/slices/transactions';
import { useDispatch, useSelector } from '../../../redux/store';
// utils
import { fCurrency } from '../../../utils/formatNumber';
import Scrollbar from '../../Scrollbar';

// ----------------------------------------------------------------------
MerchantRecentTransactions.propTypes = {
  accountId: PropTypes.string
};
export default function MerchantRecentTransactions({ accountId }) {
  const dispatch = useDispatch();
  const [transactions, setTransactions] = useState([]);
  const { recentTransactions } = useSelector((state) => state.transactions);

  accountId = accountId || '';

  useEffect(() => {
    dispatch(getRecentTransactions(accountId));
  }, [dispatch, accountId]);

  useEffect(() => {
    console.log(recentTransactions);
    const myStats = recentTransactions.filter((item) => item.accountId === accountId);
    if (myStats.length > 0) {
      const theStats = myStats[0];
      setTransactions(theStats.data.transactions);
    }
  }, [accountId, recentTransactions, setTransactions]);

  return (
    <Card>
      <CardHeader title="Latest Transactions" sx={{ mb: 3 }} />
      <Scrollbar>
        <TableContainer sx={{ minWidth: 720 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Institution</TableCell>
                <TableCell>Descriptipn</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {transactions.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>
                    <BankSummary institutionId={row.institutionId} />
                  </TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.amount < 0 ? 'Debit' : 'Credit'}</TableCell>
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
