export const columns = [
  {
    field: 'id',
    headerName: 'Id',
    flex: 1,
    searchable: false,
    hide: true
  },
  {
    field: 'logoUrl',
    headerName: '',
    flex: 1,
    renderCell: (params) => <img alt={params.value} src={params.value} height="30px" />
  },
  {
    field: 'tradingName',
    headerName: 'Trading Name',
    flex: 1
  },
  {
    field: 'legalName',
    headerName: 'Legal Name',
    flex: 1
  },
  {
    field: 'parentCompany',
    headerName: 'Parent Company',
    flex: 1
  },
  {
    field: 'subsidiaries',
    headerName: 'Subsidiaries',
    flex: 1
  },
  {
    field: 'companyNumber',
    headerName: 'Company Number',
    flex: 1
  },
  {
    field: 'iso18245CategoryCode',
    headerName: 'ISO 18245 Category Code',
    flex: 1
  },
  {
    field: 'headquartersAddress',
    headerName: 'HQ Address',
    flex: 1
  }
];
