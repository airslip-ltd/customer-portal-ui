import { Typography } from '@mui/material';
import { fCurrencyFromLong } from '../utils/formatNumber';
import { fFullDateTime } from '../utils/formatDate';
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
    headerName: 'Provider',
    flex: 1,
    renderCell: (params) => (
      <>
        <ProviderImage provider={params.value} integrationType="Commerce" fileType="icon" />
        <Typography variant="subtitle2" noWrap sx={{ pl: 1 }}>
          {params.value}
        </Typography>
      </>
    )
  },
  {
    type: 'date',
    field: 'datetime',
    headerName: 'Date',
    flex: 1,
    valueFormatter: (params) => fFullDateTime(params.value),
    filterOperators: dateFilterOperators
  },
  {
    type: 'number',
    field: 'total',
    headerName: 'Total',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value)
  },
  {
    type: 'number',
    field: 'totalRefund',
    headerName: 'Refunded',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value)
  },
  {
    field: 'currencyCode',
    headerName: 'Currency Code',
    flex: 1
  },
  {
    field: 'onlinePurchase',
    headerName: 'Purchase Type',
    flex: 1,
    valueFormatter: (params) => (params.value === true ? 'Online' : 'Bricks & Mortar')
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1
  }
];
