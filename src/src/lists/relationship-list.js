export const columns = [
  {
    field: 'invitationDetails',
    headerName: 'Business',
    flex: 1,
    filterable: false,
    sortable: false,
    valueGetter: (params) => `${params.row.invitationDetails.businessName}`
  },
  {
    field: 'userName',
    headerName: 'Contact Name',
    flex: 1,
    filterable: false,
    sortable: false,
    valueGetter: (params) =>
      `${params.row.invitationDetails.firstName || ''} ${params.row.invitationDetails.lastName || ''}`
  },
  {
    field: 'email',
    headerName: 'Contact Email',
    flex: 1,
    filterable: false,
    sortable: false,
    valueGetter: (params) => `${params.row.invitationDetails.email}`
  },
  {
    field: 'relationshipStatus',
    headerName: 'Status',
    flex: 1
  }
];
