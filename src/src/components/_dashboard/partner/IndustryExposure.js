import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import { useTheme } from '@mui/material/styles';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    name: 'Exposure',
    type: 'bar',
    data: [
      '23457675',
      '20457675',
      '3457675',
      '4576750',
      '4176250',
      '917625',
      '176250',
      '1217625',
      '1176250',
      '9176250',
      '13457675',
      '27457675'
    ]
  }
];

export default function IndustryExposure() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    stroke: { width: [5, 5, 3] },
    plotOptions: { bar: { columnWidth: '25%' } },
    colors: [theme.palette.chart.green[0], theme.palette.chart.red[0], theme.palette.chart.blue[0]],
    fill: { type: ['solid'] },
    labels: [
      'Utilities',
      'Telecommunications',
      'Consumer Staples',
      'Energy',
      'Healthcare',
      'Financial Services',
      'Industrials',
      'Real Estate',
      'Consumer Discretionary',
      'Information Technology',
      'Materials',
      'Electronics'
    ],
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Industry Exposure" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}
