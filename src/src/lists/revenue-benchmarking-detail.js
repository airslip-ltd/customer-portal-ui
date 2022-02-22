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
    field: 'description',
    headerName: 'Month',
    flex: 1,
    sortable: false
  },
  {
    field: 'year',
    headerName: 'Year',
    flex: 1,
    sortable: false
  },
  {
    type: 'number',
    field: 'value1',
    headerName: 'Company Revenue',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value),
    sortable: false
  },
  {
    type: 'number',
    field: 'value2',
    headerName: 'Industry Revenue',
    flex: 1,
    valueFormatter: (params) => fCurrencyFromLong(params.value),
    sortable: false
  }
];
