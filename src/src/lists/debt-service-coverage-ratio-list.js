import { Typography } from '@mui/material';
import { fCurrencyFromLong } from '../utils/formatNumber';

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
    field: 'debtType',
    headerName: 'Debt Type',
    flex: 1
  },
  {
    type: 'boolean',
    field: 'missedPayments',
    headerName: 'Missed Payments',
    flex: 1,
    renderCell: (params) => (
      <>
        <Typography variant="subtitle2" noWrap>
          {params.value ? 'Yes' : 'No'}
        </Typography>
      </>
    )
  },
  {
    field: 'dataSource',
    headerName: 'Data Source',
    flex: 1
  },
  {
    type: 'number',
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value)
  }
];
