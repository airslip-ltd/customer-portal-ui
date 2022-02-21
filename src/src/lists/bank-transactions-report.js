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
    field: 'bankId',
    headerName: 'Bank',
    flex: 1,
    renderCell: (params) => (
      <>
        <BankIcon icon={params.value} />
        <Typography variant="subtitle2" noWrap sx={{ pl: 1 }}>
          {params.row.tradingName}
        </Typography>
      </>
    )
  },
  {
    dataType: 'number',
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value)
  },
  {
    dataType: 'dateTime',
    field: 'capturedDate',
    headerName: 'Captured Date',
    flex: 1,
    valueFormatter: (params) => fDateFromLong(params.value),
    searchable: false
  },
  {
    field: 'currencyCode',
    headerName: 'Currency Code',
    flex: 1
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1
  },
  {
    field: 'isoFamilyCode',
    headerName: 'Iso Family Code',
    flex: 1,
    hide: true
  },
  {
    field: 'proprietaryCode',
    headerName: 'Proprietary Code',
    flex: 1,
    hide: true
  }
];
