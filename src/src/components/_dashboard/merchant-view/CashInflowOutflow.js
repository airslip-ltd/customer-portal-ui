import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const MOCK_DATA_REVENUE = {
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
};

const MOCK_DATA_EXPENSE = {
  january: -105758,
  february: -119031,
  march: -38166,
  april: -2589,
  may: -234340,
  june: -22362,
  july: -142705,
  august: -12250,
  september: -101570,
  october: -13908,
  november: -101794,
  december: -13000
};

const MOCK_DATA_NET_REVENUE = {
  january: MOCK_DATA_REVENUE.january + MOCK_DATA_EXPENSE.january,
  february: MOCK_DATA_REVENUE.february + MOCK_DATA_EXPENSE.february,
  march: MOCK_DATA_REVENUE.march + MOCK_DATA_EXPENSE.march,
  april: MOCK_DATA_REVENUE.april + MOCK_DATA_EXPENSE.april,
  may: MOCK_DATA_REVENUE.may + MOCK_DATA_EXPENSE.may,
  june: MOCK_DATA_REVENUE.june + MOCK_DATA_EXPENSE.june,
  july: MOCK_DATA_REVENUE.july + MOCK_DATA_EXPENSE.july,
  august: MOCK_DATA_REVENUE.august + MOCK_DATA_EXPENSE.august,
  september: MOCK_DATA_REVENUE.september + MOCK_DATA_EXPENSE.september,
  october: MOCK_DATA_REVENUE.october + MOCK_DATA_EXPENSE.october,
  november: MOCK_DATA_REVENUE.november + MOCK_DATA_EXPENSE.november,
  december: MOCK_DATA_REVENUE.december + MOCK_DATA_EXPENSE.december
};

const CHART_DATA = [
  {
    name: 'Money In',
    type: 'bar',
    data: [
      MOCK_DATA_REVENUE.january,
      MOCK_DATA_REVENUE.february,
      MOCK_DATA_REVENUE.march,
      MOCK_DATA_REVENUE.april,
      MOCK_DATA_REVENUE.may,
      MOCK_DATA_REVENUE.june,
      MOCK_DATA_REVENUE.july,
      MOCK_DATA_REVENUE.august,
      MOCK_DATA_REVENUE.september,
      MOCK_DATA_REVENUE.october,
      MOCK_DATA_REVENUE.november,
      MOCK_DATA_REVENUE.december
    ]
  },
  {
    name: 'Money Out',
    type: 'bar',
    data: [
      MOCK_DATA_EXPENSE.january,
      MOCK_DATA_EXPENSE.february,
      MOCK_DATA_EXPENSE.march,
      MOCK_DATA_EXPENSE.april,
      MOCK_DATA_EXPENSE.may,
      MOCK_DATA_EXPENSE.june,
      MOCK_DATA_EXPENSE.july,
      MOCK_DATA_EXPENSE.august,
      MOCK_DATA_EXPENSE.september,
      MOCK_DATA_EXPENSE.october,
      MOCK_DATA_EXPENSE.november,
      MOCK_DATA_EXPENSE.december
    ]
  },
  {
    name: 'Net Cash Position',
    type: 'line',
    data: [
      MOCK_DATA_NET_REVENUE.january,
      MOCK_DATA_NET_REVENUE.february,
      MOCK_DATA_NET_REVENUE.march,
      MOCK_DATA_NET_REVENUE.april,
      MOCK_DATA_NET_REVENUE.may,
      MOCK_DATA_NET_REVENUE.june,
      MOCK_DATA_NET_REVENUE.july,
      MOCK_DATA_NET_REVENUE.august,
      MOCK_DATA_NET_REVENUE.september,
      MOCK_DATA_NET_REVENUE.october,
      MOCK_DATA_NET_REVENUE.november,
      MOCK_DATA_NET_REVENUE.december
    ]
  }
];

export default function AnalyticsWebsiteVisits() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [5, 5, 3] },
    plotOptions: { bar: { columnWidth: '25%' } },
    colors: [theme.palette.chart.green[0], theme.palette.chart.red[0], theme.palette.chart.blue[0]],
    fill: { type: ['solid', 'solid', 'solid'] },
    labels: [
      'Mar 21',
      'Apr 21',
      'May 21',
      'Jun 21',
      'Jul 21',
      'Aug 21',
      'Sep 21',
      'Oct 21',
      'Nov 21',
      'Dec 21',
      'Jan 22',
      'Feb 22'
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)} visits`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Cash Inflow and Outflow" subheader="(+43%) than last year" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
