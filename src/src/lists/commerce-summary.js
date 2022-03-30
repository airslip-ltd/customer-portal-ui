import { Typography } from '@mui/material';
import IntegrationIcon from '../components/_dashboard/account-list/IntegrationIcon';

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
    headerName: 'Provider',
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <>
        <IntegrationIcon icon={params.value} />
        <Typography variant="subtitle2" noWrap sx={{ pl: 1 }}>
          {params.row.integrationProviderId}
        </Typography>
      </>
    )
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1
  },
  {
    field: 'provider',
    headerName: 'Provider',
    flex: 1
  }
];
