import { Typography } from '@mui/material';
import { fCurrencyFromLong } from '../utils/formatNumber';
import { fDateFromLong } from '../utils/formatDate';
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
    field: 'bankId',
    headerName: 'Bank',
    flex: 1,
    renderCell: (params) => (
      <>
        <ProviderImage provider={params.value} integrationType="Banking" fileType="icon" />
        <Typography variant="subtitle2" noWrap sx={{ pl: 1 }}>
          {params.row.tradingName}
        </Typography>
      </>
    )
  },
  {
    type: 'date',
    field: 'capturedDate',
    headerName: 'Captured Date',
    flex: 1,
    valueFormatter: (params) => fDateFromLong(params.value),
    filterOperators: dateFilterOperators
  },
  {
    type: 'number',
    field: 'amount',
    headerName: 'Amount',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value, params.row.currencyCode)
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
    headerName: 'ISO Family Code',
    flex: 1
  },
  {
    field: 'proprietaryCode',
    headerName: 'Proprietary Code',
    flex: 1
  }
];
