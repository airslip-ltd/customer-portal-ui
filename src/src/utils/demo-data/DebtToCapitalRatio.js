export const demoData = {
  'my-account-1': {
    balance: 0.4,
    movement: 0.01,
    metrics: []
  },
  'my-account-2': {
    balance: 0.332,
    movement: 0.02,
    metrics: []
  },
  'my-account-3': {
    balance: 0.597,
    movement: -0.01,
    metrics: []
  },
  'my-account-4': {
    balance: 0.223,
    movement: -0.02,
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
      amount: 50000
    },
    {
      id: '12348',
      title: 'Shareholders Equity',
      amount: 75000
    },
    {
      id: '12349',
      title: 'Debt to Capital Ratio',
      amount: 0.4
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
      title: 'Shareholders Equity',
      amount: 50000000
    },
    {
      id: '12352',
      title: 'Debt to Capital Ratio',
      amount: 0.332125817
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
      title: 'Shareholders Equity',
      amount: 200000
    },
    {
      id: '12355',
      title: 'Debt to Capital Ratio',
      amount: 0.597504528
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
      title: 'Shareholders Equity',
      amount: 50000000
    },
    {
      id: '12358',
      title: 'Debt to Capital Ratio',
      amount: 0.223770025
    }
  ]
};
