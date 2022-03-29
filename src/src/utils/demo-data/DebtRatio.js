export const demoData = {
  'my-account-1': {
    balance: 0.2,
    movement: 0.02,
    metrics: []
  },
  'my-account-2': {
    balance: 0.453,
    movement: 0.08,
    metrics: []
  },
  'my-account-3': {
    balance: 0.748,
    movement: -0.09,
    metrics: []
  },
  'my-account-4': {
    balance: 0.507,
    movement: 0.06,
    metrics: []
  }
};

export const listData = {
  'my-account-1': {
    loading: false,
    complete: true,
    error: {},
    response: {
      results: [
        {
          id: '2',
          business: 'Appital One',
          debtType: 'Credit cards',
          amount: 5000000,
          missedPayments: 1,
          dataSource: 'Open banking',
          comments: ''
        }
      ]
    }
  },
  'my-account-2': {
    loading: false,
    complete: true,
    error: {},
    response: {
      results: [
        {
          id: '4',
          business: 'Loan Company Limited',
          debtType: 'Loans',
          amount: 23901000,
          missedPayments: 0,
          dataSource: 'Accounting',
          comments: ''
        },
        {
          id: '5',
          business: 'Credit Business',
          debtType: 'Credit cards',
          amount: 450500,
          missedPayments: 1,
          dataSource: 'Open banking',
          comments: ''
        },
        {
          id: '6',
          business: 'Over the limit Ltd',
          debtType: 'Overdraft',
          amount: 512900,
          missedPayments: 0,
          dataSource: 'Open banking',
          comments: ''
        }
      ]
    }
  },
  'my-account-3': {
    loading: false,
    complete: true,
    error: {},
    response: {
      results: [
        {
          id: '7',
          business: 'Quick Business Loans',
          debtType: 'Loans',
          amount: 75665,
          missedPayments: 0,
          dataSource: 'Accounting',
          comments: ''
        },
        {
          id: '8',
          business: 'Credit Business',
          debtType: 'Credit cards',
          amount: 221235,
          missedPayments: 1,
          dataSource: 'Open banking',
          comments: ''
        }
      ]
    }
  },
  'my-account-4': {
    loading: false,
    complete: true,
    error: {},
    response: {
      results: [
        {
          id: '10',
          business: 'Fast Loans Limited',
          debtType: 'Loans',
          amount: 13901000,
          missedPayments: 0,
          dataSource: 'Accounting',
          comments: ''
        },
        {
          id: '12',
          business: 'Over the limit Ltd',
          debtType: 'Overdraft',
          amount: 512900,
          missedPayments: 0,
          dataSource: 'Open banking',
          comments: ''
        }
      ]
    }
  }
};

export const totals = {
  'my-account-1': [
    {
      id: '12347',
      title: 'Debt total',
      amount: 5000000
    },
    {
      id: '12348',
      title: 'Total Assets',
      amount: 25000000
    },
    {
      id: '12349',
      title: 'Debt Ratio',
      amount: 0.2
    }
  ],
  'my-account-2': [
    {
      id: '12350',
      title: 'Debt total',
      amount: 24864400
    },
    {
      id: '12351',
      title: 'Total Assets',
      amount: 54864400
    },
    {
      id: '12352',
      title: 'Debt Ratio',
      amount: 0.453197337
    }
  ],
  'my-account-3': [
    {
      id: '12353',
      title: 'Debt total',
      amount: 296900
    },
    {
      id: '12354',
      title: 'Total Assets',
      amount: 396900
    },
    {
      id: '12355',
      title: 'Debt Ratio',
      amount: 0.748047367
    }
  ],
  'my-account-4': [
    {
      id: '12356',
      title: 'Debt total',
      amount: 14413900
    },
    {
      id: '12357',
      title: 'Total Assets',
      amount: 28413900
    },
    {
      id: '12358',
      title: 'Debt Ratio',
      amount: 0.507283407
    }
  ]
};
