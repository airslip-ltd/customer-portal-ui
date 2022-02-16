export const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1
  },
  {
    field: 'dataSource',
    headerName: 'Data source',
    flex: 1
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
