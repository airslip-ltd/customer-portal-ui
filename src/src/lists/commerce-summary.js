import { Typography } from '@mui/material';
import ProviderImage from '../components/integrations/ProviderImage';

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
        <ProviderImage provider={params.value} integrationType="Commerce" fileType="icon" />
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
