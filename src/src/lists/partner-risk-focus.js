import { MerchantRating } from '../components/_dashboard/merchant-demo';

export const columns = [
  {
    field: 'id',
    headerName: 'ID',
    flex: 1,
    hide: true,
    sortable: false
  },
  {
    field: 'name',
    headerName: 'Business Name',
    flex: 1,
    sortable: false
  },
  {
    type: 'number',
    field: 'riskScore',
    headerName: 'Risk Score',
    flex: 1,
    sortable: false,
    renderCell: (params) => (
      <>
        <MerchantRating score={params.value} />
      </>
    )
  }
];
