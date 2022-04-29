import { Typography } from '@mui/material';
import ReactTimeAgo from 'react-time-ago';
import { fCurrency } from '../utils/formatNumber';
import { descriptors } from '../utils/descriptors';
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
          {params.row.provider.friendlyName}
        </Typography>
      </>
    )
  },
  {
    field: 'description',
    headerName: 'Description',
    flex: 1,
    renderCell: (params) => <>{descriptors.integration(params.row)}</>
  },
  {
    field: 'accountType',
    headerName: 'Account Type',
    flex: 1,
    renderCell: (params) => <>{descriptors.bankingAccountType(params.row.accountDetail)}</>
  },
  {
    field: 'usageType',
    headerName: 'Usage Type',
    flex: 1,
    renderCell: (params) => <>{descriptors.bankingUsageType(params.row.accountDetail)}</>
  },
  {
    type: 'number',
    field: 'balance',
    headerName: 'Balance',
    flex: 1,
    valueFormatter: (params) => fCurrency(params.value, params.row.currencyCode)
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
