import ReactTimeAgo from 'react-time-ago';
import { fCurrency } from '../utils/formatNumber';
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
