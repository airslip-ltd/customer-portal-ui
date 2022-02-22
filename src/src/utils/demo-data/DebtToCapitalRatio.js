export const demoData = {
  'my-account-1': {
    balance: 0.26,
    movement: -0.03,
    metrics: []
  }
};

// columns can be found in debt-to-capital-ratio-list.js
export const listData = {
  loading: false,
  hasData: false,
  error: {},
  response: {
    results: [
      {
        id: '12345',
        business: 'XXXXXXXXX',
        debtType: 'XXCXXXX',
        amount: 23901000,
        missedPayments: 0,
        dataSource: 'XXXXXX',
        comments: ''
      },
      {
        id: '12346',
        business: 'Credit Business',
        debtType: 'Credit cards',
        amount: 450500,
        missedPayments: 1,
        dataSource: 'Open banking',
        comments: ''
      },
      {
        id: '12347',
        business: 'Over the limit Ltd',
        debtType: 'Overdraft',
        amount: 512900,
        missedPayments: 0,
        dataSource: 'Open banking',
        comments: ''
      }
    ]
  }
};

export const totals = [
  {
    id: '12347',
    title: 'Debt total',
    amount: 24864400
  },
  {
    id: '12348',
    title: 'Operating Income Total',
    amount: 15390100
  },
  {
    id: '12349',
    title: 'Debt Service Coverag Ratio',
    amount: 1.616
  }
];