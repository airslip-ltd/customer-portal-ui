export const listData = {
  loading: false,
  complete: false,
  error: {},
  response: {
    results: [
      {
        id: 'bank-account-1',
        institutionId: 'revolut_eu',
        accountStatus: 'Active',
        sortCode: '040075',
        accountNumber: '27632113',
        currencyCode: 'GBP',
        balance: 160.72,
        updatedOn: '2022-02-21T15:45:00'
      }
    ]
  }
};

export const cashflowByAccount = {
  'bank-account-1': [
    {
      year: 2022,
      series: [
        {
          name: 'Receivables',
          metrics: [
            { period: 1, description: 'Jan', balance: 789516.0, periodType: 'Month' },
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
          data: [7895.16, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        },
        {
          name: 'Payables',
          metrics: [
            { period: 1, description: 'Jan', balance: -687335.0, periodType: 'Month' },
            { period: 2, description: 'Feb', balance: -151009.0, periodType: 'Month' },
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
          data: [6873.35, 1510.09, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
        }
      ]
    }
  ]
};

export const transactionsByAccount = {
  'bank-account-1': {
    loading: false,
    complete: false,
    error: {},
    response: {
      results: [
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|65726c86-385c-3ad8-8708-1ec445cedcbb',
          source: 'santander_uk',
          amount: -36.45,
          currencyCode: 'GBP',
          capturedDate: 1645401600000,
          description: "SAINSBURY'S S/MKT (VIA APPLE PAY), ON 20-02-2022"
        },
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|69c00171-f9e4-3c52-a298-496babbd00e3',
          source: 'santander_uk',
          amount: -17.35,
          currencyCode: 'GBP',
          capturedDate: 1645401600000,
          description: 'SAINSBURYS S/MKTS (VIA APPLE PAY), ON 20-02-2022'
        },
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|6c3c235f-85dc-3642-aa99-a7f63f79313e',
          source: 'santander_uk',
          amount: -5.0,
          currencyCode: 'GBP',
          capturedDate: 1645401600000,
          description: 'STARBUCKS APP (VIA APPLE PAY), ON 20-02-2022'
        },
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|8ecb88dc-1210-3afd-b12a-33007f66c813',
          source: 'santander_uk',
          amount: -4.0,
          currencyCode: 'GBP',
          capturedDate: 1645401600000,
          description: 'DAYTONA SANDOWN PARK L (VIA APPLE PAY), ON 19-02-2022'
        },
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|b91e621b-7ed0-3de4-920d-747d8a702499',
          source: 'santander_uk',
          amount: 138.83,
          currencyCode: 'GBP',
          capturedDate: 1645401600000,
          description: 'FASTER PAYMENTS RECEIPT REF.PD3463669BATES FROM ANIMAL FRIENDS CLA'
        },
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|b402ddaf-475e-3fe6-abbf-f67900d882b1',
          source: 'santander_uk',
          amount: -41.0,
          currencyCode: 'GBP',
          capturedDate: 1645315200000,
          description: 'JAS HAIR AND BEAUTY (VIA APPLE PAY), ON 19-02-2022'
        },
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|d06d553a-f731-3e1d-b5c0-5920ed5b5ae4',
          source: 'santander_uk',
          amount: 200.0,
          currencyCode: 'GBP',
          capturedDate: 1645315200000,
          description: 'TRANSFER FROM MISS JADE ELIZABETH BATES'
        },
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|791478e6-8e9d-31e4-be81-457a6e7c189b',
          source: 'santander_uk',
          amount: -29.15,
          currencyCode: 'GBP',
          capturedDate: 1645315200000,
          description: 'NANDOS.CO.UK (VIA APPLE PAY), ON 19-02-2022'
        },
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|81bae83b-dba7-3a28-9129-b0c27b7f64b0',
          source: 'santander_uk',
          amount: -60.0,
          currencyCode: 'GBP',
          capturedDate: 1645315200000,
          description: 'BILL PAYMENT VIA FASTER PAYMENT TO MIA 68 LTD REFERENCE JADE BATES , MANDATE NO 184'
        },
        {
          id: '65e5c84f2f9045dc80a7b7a8065ef8be|114a5728-4137-389b-8dbc-d5a0b9eb7eb1',
          source: 'santander_uk',
          amount: -37.45,
          currencyCode: 'GBP',
          capturedDate: 1645315200000,
          description: 'SAINSBURYS S/MKTS (VIA APPLE PAY), ON 19-02-2022'
        }
      ]
    }
  }
};
