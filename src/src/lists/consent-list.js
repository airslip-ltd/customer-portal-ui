export const columns = [
  {
    field: 'partnerName',
    headerName: 'Partner Name',
    flex: 1,
    filterable: false,
    sortable: false,
    valueGetter: (params) => `${params.row.partnerName}`
  },
  {
    field: 'dataAccess',
    headerName: 'Data Access',
    flex: 1,
    filterable: false,
    sortable: false,
    valueGetter: (params) => `${params.row.permission.map((access) => access.permissionType)}`
  },
  {
    field: 'relationshipStatus',
    headerName: 'Status',
    flex: 1
  }
];
