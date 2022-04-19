export const demoData = {
  '9666f117cf604743a346c80d9a66a7e5': {
    balance: 0.4,
    movement: 0.01,
    metrics: []
  },
  '4e28ad4873f543f0854774ae298297db': {
    balance: 0.332,
    movement: 0.02,
    metrics: []
  },
  '22f237a2547c430a86d171a24e301f44': {
    balance: 0.597,
    movement: -0.01,
    metrics: []
  },
  a5c42d1717684e7496b6c839bfcb0948: {
    balance: 0.223,
    movement: -0.02,
    metrics: []
  }
};

export const listData = {
  '9666f117cf604743a346c80d9a66a7e5': {
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
  '4e28ad4873f543f0854774ae298297db': {
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
  '22f237a2547c430a86d171a24e301f44': {
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
  a5c42d1717684e7496b6c839bfcb0948: {
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
  '9666f117cf604743a346c80d9a66a7e5': [
    {
      id: '12347',
      title: 'Debt total',
      amount: 5000000
    },
    {
      id: '12348',
      title: 'Shareholders Equity',
      amount: 7500000
    },
    {
      id: '12349',
      title: 'Debt to Capital Ratio',
      amount: 0.4
    }
  ],
  '4e28ad4873f543f0854774ae298297db': [
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
  '22f237a2547c430a86d171a24e301f44': [
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
  a5c42d1717684e7496b6c839bfcb0948: [
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
