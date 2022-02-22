import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Stack, Box, Typography } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const chartData = {
  legend: [
    {
      label: 'Pending',
      number: 15
    },
    {
      label: 'Connected',
      number: 85,
      color: 'primary.main'
    }
  ],
  series: [85]
};

Legend.propTypes = {
  label: PropTypes.string,
  number: PropTypes.number,
  color: PropTypes.string
};

function Legend({ label, number, color }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: 'grey.50016',
            borderRadius: 0.75,
            ...(color && {
              bgcolor: color
            })
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="subtitle1">{number}</Typography>
    </Stack>
  );
}

export default function ConnectedBusinesses() {
  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    grid: {
      padding: { top: -32, bottom: -32 }
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            { offset: 100, color: theme.palette.primary.main }
          ]
        ]
      }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'Invited',
            formatter: () => fNumber(100)
          }
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Connected Businesses" sx={{ mb: 8 }} />
      <ReactApexChart type="radialBar" series={chartData.series} options={chartOptions} height={310} />

      <Stack spacing={2} sx={{ p: 5 }}>
        {chartData.legend.map((legend) => (
          <Legend key={legend} label={legend.label} number={legend.number} color={legend.color} />
        ))}
      </Stack>
    </Card>
  );
}
