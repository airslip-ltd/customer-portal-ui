import ReactTimeAgo from 'react-time-ago';
import { Typography } from '@mui/material';
import { fCurrency } from '../utils/formatNumber';
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
    field: 'source',
    headerName: 'Bank',
    flex: 1,
    renderCell: (params) => (
      <>
        <BankIcon icon={params.value} />
        <Typography variant="subtitle2" noWrap sx={{ pl: 1 }}>
          {params.value}
        </Typography>
      </>
    )
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1
  },
  {
    field: 'source',
    headerName: 'Source',
    flex: 1
  },
  {
    type: 'dateTime',
    field: 'capturedDate',
    headerName: 'Captured Date',
    flex: 1,
    renderCell: (params) => (
      <>
        <ReactTimeAgo date={params.value} locale="en-US" />
      </>
    )
  },
  {
    type: 'number',
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    renderCell: (params) => fCurrency(params.value)
  }
];
