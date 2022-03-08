export const demoData = {
  'my-account-1': {
    balance: 101.04,
    movement: -0.04,
    metrics: []
  },
  'my-account-2': {
    balance: 1.25,
    movement: 0.08,
    metrics: []
  },
  'my-account-3': {
    balance: 1.15,
    movement: -0.09,
    metrics: []
  },
  'my-account-4': {
    balance: 1.65,
    movement: 0.06,
    metrics: []
  }
};

export const listData = {
  'my-account-1': {
    loading: false,
    hasData: true,
    error: {},
    response: {
      results: [
        {
          id: '2',
          business: 'Appital One',
          debtType: 'Credit cards',
          amount: 50000,
          missedPayments: 1,
          dataSource: 'Open banking',
          comments: ''
        }
      ]
    }
  },
  'my-account-2': {
    loading: false,
    hasData: true,
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
    hasData: true,
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
    hasData: true,
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
      title: 'Operating Income Total',
      amount: 505201000
    },
    {
      id: '12349',
      title: 'Debt Service Coverage Ratio',
      amount: 101.0402
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
      title: 'Operating Income Total',
      amount: 31080500
    },
    {
      id: '12352',
      title: 'Debt Service Coverage Ratio',
      amount: 1.25
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
      title: 'Operating Income Total',
      amount: 341435
    },
    {
      id: '12355',
      title: 'Debt Service Coverage Ratio',
      amount: 1.15
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
      title: 'Operating Income Total',
      amount: 23782935
    },
    {
      id: '12358',
      title: 'Debt Service Coverage Ratio',
      amount: 1.65
    }
  ]
};
