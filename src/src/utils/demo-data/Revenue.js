export const demoData = {
  'my-account-1': {
    january: 9500,
    february: 50500,
    march: 109500,
    april: 84430,
    may: 148600,
    june: 104000,
    july: 70500,
    august: 44100,
    september: 109100,
    october: 10500,
    november: 32500,
    december: 80500
  }
};

export const chartDataSummary = {
  series: [
    {
      name: 'Revenue',
      metrics: [
        { period: 1, description: 'Dec', balance: 80500, periodType: 'Month' },
        { period: 2, description: 'Jan', balance: 9500, periodType: 'Month' },
        { period: 3, description: 'Feb', balance: 50500, periodType: 'Month' }
      ],
      data: [80500, 9500, 50500]
    },
    {
      name: 'Refunds',
      metrics: [
        { period: 1, description: 'Jan', balance: 0.0, periodType: 'Month' },
        { period: 2, description: 'Feb', balance: 0.0, periodType: 'Month' },
        { period: 3, description: 'Mar', balance: 0.0, periodType: 'Month' }
      ],
      data: [0.0, 0.0, 0.0]
    }
  ]
};

export const chartDataFull = {
  series: [
    {
      name: 'Revenue',
      metrics: [
        { period: 1, description: 'Mar', balance: 109500, periodType: 'Month' },
        { period: 2, description: 'Apr', balance: 84430, periodType: 'Month' },
        { period: 3, description: 'May', balance: 148600, periodType: 'Month' },
        { period: 4, description: 'Jun', balance: 104000, periodType: 'Month' },
        { period: 5, description: 'Jul', balance: 70500, periodType: 'Month' },
        { period: 6, description: 'Aug', balance: 44100, periodType: 'Month' },
        { period: 7, description: 'Sep', balance: 109100, periodType: 'Month' },
        { period: 8, description: 'Oct', balance: 10500, periodType: 'Month' },
        { period: 9, description: 'Nov', balance: 32500, periodType: 'Month' },
        { period: 10, description: 'Dec', balance: 80500, periodType: 'Month' },
        { period: 11, description: 'Jan', balance: 9500, periodType: 'Month' },
        { period: 12, description: 'Feb', balance: 50500, periodType: 'Month' }
      ],
      data: [109500, 84430, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0]
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
};
