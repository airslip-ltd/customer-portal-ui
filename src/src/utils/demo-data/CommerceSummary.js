export const listData = {
  loading: false,
  complete: false,
  error: {},
  response: {
    results: [
      {
        id: 'commerce-account-1',
        entityStatus: 'Active',
        authenticationState: 'Authenticated',
        provider: 'Shopify',
        name: 'steves-business-store.myshopify.com',
        dataSource: 'Api2Cart'
      }
    ]
  }
};

export const revenueByAccount = {
  'commerce-account-1': [
    {
      year: 2022,
      series: [
        {
          name: 'Revenue',
          metrics: [
            { period: 1, description: 'Jan', balance: 42000.0, periodType: 'Month' },
            { period: 2, description: 'Feb', balance: 14000.0, periodType: 'Month' },
            { period: 3, description: 'Mar', balance: 0.0, periodType: 'Month' },
            { period: 4, description: 'Apr', balance: 0.0, periodType: 'Month' },
            { period: 5, description: 'May', balance: 0.0, periodType: 'Month' },
            { period: 6, description: 'Jun', balance: 0.0, periodType: 'Month' },
            { period: 7, description: 'Jul', balance: 0.0, periodType: 'Month' },
            { period: 8, description: 'Aug', balance: 0.0, periodType: 'Month' },
            { period: 9, description: 'Sep', balance: 0.0, periodType: 'Month' },
            { period: 10, description: 'Oct', balance: 0.0, periodType: 'Month' },
            { period: 11, description: 'Nov', balance: 0.0, periodType: 'Month' },
            { period: 12, description: 'Dec', balance: 0.0, periodType: 'Month' }
          ],
          data: [420.0, 140.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
          name: 'Refunds',
          metrics: [
            { period: 1, description: 'Jan', balance: 0.0, periodType: 'Month' },
            { period: 2, description: 'Feb', balance: 0.0, periodType: 'Month' },
            { period: 3, description: 'Mar', balance: 0.0, periodType: 'Month' },
            { period: 4, description: 'Apr', balance: 0.0, periodType: 'Month' },
            { period: 5, description: 'May', balance: 0.0, periodType: 'Month' },
            { period: 6, description: 'Jun', balance: 0.0, periodType: 'Month' },
            { period: 7, description: 'Jul', balance: 0.0, periodType: 'Month' },
            { period: 8, description: 'Aug', balance: 0.0, periodType: 'Month' },
            { period: 9, description: 'Sep', balance: 0.0, periodType: 'Month' },
            { period: 10, description: 'Oct', balance: 0.0, periodType: 'Month' },
            { period: 11, description: 'Nov', balance: 0.0, periodType: 'Month' },
            { period: 12, description: 'Dec', balance: 0.0, periodType: 'Month' }
          ],
          data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        }
      ]
    },
    {
      year: 2021,
      series: [
        {
          name: 'Revenue',
          metrics: [
            { period: 1, description: 'Jan', balance: 42000.0, periodType: 'Month' },
            { period: 2, description: 'Feb', balance: 14000.0, periodType: 'Month' },
            { period: 3, description: 'Mar', balance: 0.0, periodType: 'Month' },
            { period: 4, description: 'Apr', balance: 0.0, periodType: 'Month' },
            { period: 5, description: 'May', balance: 0.0, periodType: 'Month' },
            { period: 6, description: 'Jun', balance: 0.0, periodType: 'Month' },
            { period: 7, description: 'Jul', balance: 0.0, periodType: 'Month' },
            { period: 8, description: 'Aug', balance: 0.0, periodType: 'Month' },
            { period: 9, description: 'Sep', balance: 0.0, periodType: 'Month' },
            { period: 10, description: 'Oct', balance: 0.0, periodType: 'Month' },
            { period: 11, description: 'Nov', balance: 0.0, periodType: 'Month' },
            { period: 12, description: 'Dec', balance: 0.0, periodType: 'Month' }
          ],
          data: [420.0, 140.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
          name: 'Refunds',
          metrics: [
            { period: 1, description: 'Jan', balance: 0.0, periodType: 'Month' },
            { period: 2, description: 'Feb', balance: 0.0, periodType: 'Month' },
            { period: 3, description: 'Mar', balance: 0.0, periodType: 'Month' },
            { period: 4, description: 'Apr', balance: 0.0, periodType: 'Month' },
            { period: 5, description: 'May', balance: 0.0, periodType: 'Month' },
            { period: 6, description: 'Jun', balance: 0.0, periodType: 'Month' },
            { period: 7, description: 'Jul', balance: 0.0, periodType: 'Month' },
            { period: 8, description: 'Aug', balance: 0.0, periodType: 'Month' },
            { period: 9, description: 'Sep', balance: 0.0, periodType: 'Month' },
            { period: 10, description: 'Oct', balance: 0.0, periodType: 'Month' },
            { period: 11, description: 'Nov', balance: 0.0, periodType: 'Month' },
            { period: 12, description: 'Dec', balance: 0.0, periodType: 'Month' }
          ],
          data: [0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        }
      ]
    }
  ]
};

export const transactionsByAccount = {
  'commerce-account-1': {
    loading: false,
    complete: false,
    error: {},
    response: {
      results: [
        {
          id: '3976148746380',
          source: 'Shopify',
          amount: 35.0,
          currencyCode: null,
          capturedDate: 1644495571000,
          description: 'Short Sleeved T-Shirt'
        },
        {
          id: '3974470434956',
          source: 'Shopify',
          amount: 105.0,
          currencyCode: 'GBP',
          capturedDate: 1644324812000,
          description: 'Short Sleeved T-Shirt'
        },
        {
          id: '3962893500556',
          source: 'Shopify',
          amount: 105.0,
          currencyCode: 'GBP',
          capturedDate: 1643382010000,
          description: 'Short Sleeved T-Shirt'
        },
        {
          id: '3962872823948',
          source: 'Shopify',
          amount: 210.0,
          currencyCode: null,
          capturedDate: 1643380743000,
          description: 'Short Sleeved T-Shirt'
        },
        {
          id: '3962868236428',
          source: 'Shopify',
          amount: 105.0,
          currencyCode: null,
          capturedDate: 1643380467000,
          description: 'Short Sleeved T-Shirt'
        },
        {
          id: '3961239896204',
          source: 'Shopify',
          amount: 35.0,
          currencyCode: null,
          capturedDate: 1643298878000,
          description: 'Short Sleeved T-Shirt'
        }
      ]
    }
  }
};
