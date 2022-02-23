import { Typography } from '@mui/material';
import ReactTimeAgo from 'react-time-ago';
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
    field: 'institutionId',
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
    field: 'sortCode',
    headerName: 'Sort Code',
    flex: 1
  },
  {
    field: 'accountNumber',
    headerName: 'Account Number',
    flex: 1
  },
  {
    dataType: 'number',
    field: 'balance',
    headerName: 'Balance',
    flex: 1,
    valueFormatter: (params) => fCurrency(params.value)
  },
  {
    dataType: 'dateTime',
    field: 'updatedOn',
    headerName: 'Last Updated',
    flex: 1,
    renderCell: (params) => (
      <>
        <ReactTimeAgo date={params.value} locale="en-US" />
      </>
    )
  }
];