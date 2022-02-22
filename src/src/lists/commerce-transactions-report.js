import { fCurrencyFromLong } from '../utils/formatNumber';
import { fFullDateTime } from '../utils/formatDate';

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
    headerName: 'Source',
    flex: 1
  },
  {
    dataType: 'number',
    field: 'total',
    headerName: 'Total',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value)
  },
  {
    dataType: 'dateTime',
    field: 'datetime',
    headerName: 'Date',
    flex: 1,
    valueFormatter: (params) => fFullDateTime(params.value),
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
  }
];
