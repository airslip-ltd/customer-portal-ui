import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Typography, Stack } from '@mui/material';
import { useEffect, useState } from 'react';
import { LoadingCard } from '../../_common/progress';
// utils
import { fNumber, fPercent } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const IconWrapperStyle = styled('div')(({ theme }) => ({
  width: 24,
  height: 24,
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.success.main,
  backgroundColor: alpha(theme.palette.success.main, 0.16)
}));

// ----------------------------------------------------------------------

MerchantDashboardSnapshot.propTypes = {
  snapshot: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  navigateTo: PropTypes.string.isRequired,
  graphColor: PropTypes.string
};

export default function MerchantDashboardSnapshot({ snapshot, graphColor, title, navigateTo }) {
  const [metricData, setMetricData] = useState({});
  const [chartData, setChartData] = useState([]);
  const theme = useTheme();

  const CHART_DATA = [
    {
      data: chartData
    }
  ];

  const chartOptions = {
    colors: [graphColor || theme.palette.primary.main],
    chart: { sparkline: { enabled: true } },
    plotOptions: { bar: { columnWidth: '68%', borderRadius: 2 } },
    labels: ['1', '2', '3', '4', '5', '6', '7', '8'],
    tooltip: {
      x: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      },
      marker: { show: false }
    }
  };

  useEffect(() => {
    if (!snapshot.complete) return;
    setMetricData(snapshot.response);
    const newData = snapshot.response.metrics.map((metric) => metric.balance);
    setChartData(newData);
  }, [snapshot]);

  return (
    <LoadingCard apiRequest={snapshot} title={title} navigateTo={navigateTo}>
      <Box sx={{ display: 'flex' }}>
        <Box sx={{ flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <IconWrapperStyle
              sx={{
                ...(metricData.movement < 0 && {
                  color: 'error.main',
                  bgcolor: alpha(theme.palette.error.main, 0.16)
                })
              }}
            >
              <Icon width={16} height={16} icon={metricData.movement >= 0 ? trendingUpFill : trendingDownFill} />
            </IconWrapperStyle>
            <Typography component="span" variant="subtitle2">
              {metricData.movement > 0 && '+'}
              {fPercent(metricData.movement)}
            </Typography>
          </Stack>

          <Typography variant="h3">&pound;{fNumber(metricData.balance)}</Typography>
        </Box>

        <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} width={60} height={36} />
      </Box>
    </LoadingCard>
  );
}
