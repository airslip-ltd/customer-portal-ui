import ReactTimeAgo from 'react-time-ago';
import { Typography } from '@mui/material';
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
    field: 'source',
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
    type: 'date',
    field: 'capturedDate',
    headerName: 'Captured Date',
    flex: 1,
    renderCell: (params) => (
      <>
        <ReactTimeAgo date={params.value} locale="en-US" />
      </>
    ),
    filterOperators: dateFilterOperators
  },
  {
    type: 'number',
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    renderCell: (params) => fCurrency(params.value)
  }
];
