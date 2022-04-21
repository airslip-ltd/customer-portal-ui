import { Typography } from '@mui/material';
import ReactTimeAgo from 'react-time-ago';
import { fCurrency } from '../utils/formatNumber';
import ProviderImage from '../components/integrations/ProviderImage';
import { dateFilterOperators } from './filters';

export const columns = [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    searchable: false,
    hide: true
  },
  {
    field: 'integrationProviderId',
    headerName: 'Bank',
    flex: 1,
    renderCell: (params) => (
      <>
        <ProviderImage provider={params.value} integrationType="Banking" fileType="icon" />
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
    type: 'number',
    field: 'balance',
    headerName: 'Balance',
    flex: 1,
    valueFormatter: (params) => fCurrency(params.value)
  },
  {
    type: 'date',
    field: 'updatedOn',
    headerName: 'Last Updated',
    flex: 1,
    renderCell: (params) => (
      <>
        <ReactTimeAgo date={new Date(params.value)} locale="en-US" />
      </>
    ),
    filterOperators: dateFilterOperators
  }
];
