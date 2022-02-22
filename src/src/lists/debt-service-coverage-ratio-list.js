import { Typography } from '@mui/material';
import { fCurrencyFromLong } from '../utils/formatNumber';
import { fDateFromLong } from '../utils/formatDate';
import BankIcon from '../components/_dashboard/account-list/BankIcon';

export const columns = [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    searchable: false,
    hide: true
  },
  {
    field: 'business',
    headerName: 'Business',
    flex: 1
  },
  {
    dataType: 'number',
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value)
  },
  {
    field: 'debtType',
    headerName: 'Debt Type',
    flex: 1
  },
  {
    dataType: 'boolean',
    field: 'missedPayments',
    headerName: 'Missed Payments',
    flex: 1,
    renderCell: (params) => (
      <>
        <Typography variant="subtitle2" noWrap sx={{ pl: 1 }}>
          {params.value}
        </Typography>
      </>
    )
  },
  {
    field: 'dataSource',
    headerName: 'Data Source',
    flex: 1
  }
];
