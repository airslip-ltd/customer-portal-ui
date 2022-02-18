export const columns = [
  {
    field: 'invitationDetails',
    headerName: 'Invitation Details',
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
    field: 'relationshipStatus',
    headerName: 'Status',
    flex: 1
  }
];
