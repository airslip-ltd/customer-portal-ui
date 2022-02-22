export const chartDataSummary = {
  series: [
    {
      name: 'Revenue',
      metrics: [
        { period: 1, description: 'Dec', year: '2021', balance: 80500, periodType: 'Month' },
        { period: 2, description: 'Jan', year: '2022', balance: 9500, periodType: 'Month' },
        { period: 3, description: 'Feb', year: '2022', balance: 50500, periodType: 'Month' }
      ],
      data: [80500, 9500, 50500]
    },
    {
      name: 'Benchmark',
      metrics: [
        { period: 1, description: 'Dec', year: '2021', balance: 200875, periodType: 'Month' },
        { period: 2, description: 'Jan', year: '2022', balance: 126875, periodType: 'Month' },
        { period: 3, description: 'Feb', year: '2022', balance: 116875, periodType: 'Month' }
      ],
      data: [200875, 126875, 116875]
    }
  ]
};

export const chartDataFull = {
  series: [
    {
      name: 'Revenue',
      metrics: [
        { period: 1, description: 'Mar', year: '2021', balance: 109500, periodType: 'Month' },
        { period: 2, description: 'Apr', year: '2021', balance: 84430, periodType: 'Month' },
        { period: 3, description: 'May', year: '2021', balance: 148600, periodType: 'Month' },
        { period: 4, description: 'Jun', year: '2021', balance: 104000, periodType: 'Month' },
        { period: 5, description: 'Jul', year: '2021', balance: 70500, periodType: 'Month' },
        { period: 6, description: 'Aug', year: '2021', balance: 44100, periodType: 'Month' },
        { period: 7, description: 'Sep', year: '2021', balance: 109100, periodType: 'Month' },
        { period: 8, description: 'Oct', year: '2021', balance: 10500, periodType: 'Month' },
        { period: 9, description: 'Nov', year: '2021', balance: 32500, periodType: 'Month' },
        { period: 10, description: 'Dec', year: '2021', balance: 80500, periodType: 'Month' },
        { period: 11, description: 'Jan', year: '2022', balance: 9500, periodType: 'Month' },
        { period: 12, description: 'Feb', year: '2022', balance: 50500, periodType: 'Month' }
      ],
      data: [109500, 84430, 148600, 104000, 70500, 44100, 109100, 10500, 32500, 80500, 9500, 50500]
    },
    {
      name: 'Benchmark',
      metrics: [
        { period: 1, description: 'Mar', year: '2021', balance: 126875, periodType: 'Month' },
        { period: 2, description: 'Apr', year: '2021', balance: 103875, periodType: 'Month' },
        { period: 3, description: 'May', year: '2021', balance: 106875, periodType: 'Month' },
        { period: 4, description: 'Jun', year: '2021', balance: 109875, periodType: 'Month' },
        { period: 5, description: 'Jul', year: '2021', balance: 117875, periodType: 'Month' },
        { period: 6, description: 'Aug', year: '2021', balance: 123875, periodType: 'Month' },
        { period: 7, description: 'Sep', year: '2021', balance: 125875, periodType: 'Month' },
        { period: 8, description: 'Oct', year: '2021', balance: 130875, periodType: 'Month' },
        { period: 9, description: 'Nov', year: '2021', balance: 190875, periodType: 'Month' },
        { period: 10, description: 'Dec', year: '2021', balance: 200875, periodType: 'Month' },
        { period: 11, description: 'Jan', year: '2022', balance: 126875, periodType: 'Month' },
        { period: 12, description: 'Feb', year: '2022', balance: 116875, periodType: 'Month' }
      ],
      data: [116875, 126875, 200875, 190875, 130875, 125875, 123875, 117875, 109875, 106875, 103875, 126875]
    }
  ]
};

function buildResults() {
  const results = [];

  const descriptions = chartDataFull.series[0].metrics.map((metric) => metric.description);
  const years = chartDataFull.series[0].metrics.map((metric) => metric.year);
  const balances1 = chartDataFull.series[0].metrics.map((metric) => metric.balance);
  const balances2 = chartDataFull.series[1].metrics.map((metric) => metric.balance);

  for (let i = 0; i < 12; i += 1) {
    results.push({
      id: i,
      description: descriptions[i],
      year: years[i],
      value1: balances1[i],
      value2: balances2[i]
    });
  }

  return results;
}

export const listData = {
  loading: false,
  hasData: false,
  error: {},
  response: {
    results: buildResults()
  }
};
