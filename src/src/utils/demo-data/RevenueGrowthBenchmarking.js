export const chartDataSummary = {
  series: [
    {
      name: 'Revenue',
      metrics: [
        { period: 1, description: 'Dec', year: '2021', balance: 8050000, periodType: 'Month' },
        { period: 2, description: 'Jan', year: '2022', balance: 950000, periodType: 'Month' },
        { period: 3, description: 'Feb', year: '2022', balance: 5050000, periodType: 'Month' }
      ],
      data: [8050000, 950000, 5050000]
    },
    {
      name: 'Benchmark',
      metrics: [
        { period: 1, description: 'Dec', year: '2021', balance: 20087500, periodType: 'Month' },
        { period: 2, description: 'Jan', year: '2022', balance: 12687500, periodType: 'Month' },
        { period: 3, description: 'Feb', year: '2022', balance: 11687500, periodType: 'Month' }
      ],
      data: [20087500, 12687500, 11687500]
    }
  ]
};

export const chartDataFull = {
  series: [
    {
      name: 'Revenue',
      metrics: [
        { period: 1, description: 'Mar', year: '2021', balance: 10950000, periodType: 'Month' },
        { period: 2, description: 'Apr', year: '2021', balance: 8443000, periodType: 'Month' },
        { period: 3, description: 'May', year: '2021', balance: 14860000, periodType: 'Month' },
        { period: 4, description: 'Jun', year: '2021', balance: 10400000, periodType: 'Month' },
        { period: 5, description: 'Jul', year: '2021', balance: 7050000, periodType: 'Month' },
        { period: 6, description: 'Aug', year: '2021', balance: 4410000, periodType: 'Month' },
        { period: 7, description: 'Sep', year: '2021', balance: 10910000, periodType: 'Month' },
        { period: 8, description: 'Oct', year: '2021', balance: 1050000, periodType: 'Month' },
        { period: 9, description: 'Nov', year: '2021', balance: 3250000, periodType: 'Month' },
        { period: 10, description: 'Dec', year: '2021', balance: 8050000, periodType: 'Month' },
        { period: 11, description: 'Jan', year: '2022', balance: 950000, periodType: 'Month' },
        { period: 12, description: 'Feb', year: '2022', balance: 5050000, periodType: 'Month' }
      ],
      data: [
        10950000, 8443000, 14860000, 10400000, 7050000, 4410000, 10910000, 1050000, 3250000, 8050000, 950000, 5050000
      ]
    },
    {
      name: 'Benchmark',
      metrics: [
        { period: 1, description: 'Mar', year: '2021', balance: 12687500, periodType: 'Month' },
        { period: 2, description: 'Apr', year: '2021', balance: 10387500, periodType: 'Month' },
        { period: 3, description: 'May', year: '2021', balance: 10687500, periodType: 'Month' },
        { period: 4, description: 'Jun', year: '2021', balance: 10987500, periodType: 'Month' },
        { period: 5, description: 'Jul', year: '2021', balance: 11787500, periodType: 'Month' },
        { period: 6, description: 'Aug', year: '2021', balance: 12387500, periodType: 'Month' },
        { period: 7, description: 'Sep', year: '2021', balance: 12587500, periodType: 'Month' },
        { period: 8, description: 'Oct', year: '2021', balance: 13087500, periodType: 'Month' },
        { period: 9, description: 'Nov', year: '2021', balance: 19087500, periodType: 'Month' },
        { period: 10, description: 'Dec', year: '2021', balance: 20087500, periodType: 'Month' },
        { period: 11, description: 'Jan', year: '2022', balance: 12687500, periodType: 'Month' },
        { period: 12, description: 'Feb', year: '2022', balance: 11687500, periodType: 'Month' }
      ],
      data: [
        11687500, 12687500, 20087500, 19087500, 13087500, 12587500, 12387500, 11787500, 10987500, 10687500, 10387500,
        12687500
      ]
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
  complete: false,
  error: {},
  response: {
    results: buildResults()
  }
};
