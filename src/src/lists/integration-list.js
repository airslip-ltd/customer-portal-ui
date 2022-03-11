import { Typography } from '@mui/material';
import IntegrationIcon from '../components/_dashboard/account-list/IntegrationIcon';

export const columns = [
  // Need to include friendly name of the provider name + icon
  {
    field: 'integrationProviderId',
    headerName: 'Provider',
    sortable: false,
    flex: 1,
    renderCell: (params) => (
      <>
        <IntegrationIcon icon={params.value} />
        <Typography variant="subtitle2" noWrap sx={{ pl: 1 }}>
          {params.row.tradingName}
        </Typography>
      </>
    )
  },
  {
    field: 'dataSource',
    headerName: 'Data source',
    flex: 1,
    hide: false
  },
  {
    field: 'authenticationState',
    headerName: 'State',
    sortable: false,
    hide: true,
    flex: 1
  },
  {
    type: 'dateTime',
    field: 'timeStamp',
    headerName: 'Time Stamp',
    flex: 1,
    valueGetter: ({ value }) => value && new Date(value)
  }
];
