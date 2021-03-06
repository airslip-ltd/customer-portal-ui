import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Link, Card, Typography, Stack, CardActionArea } from '@mui/material';
import { useEffect, useState } from 'react';
import { ApiErrorTooltip } from '../../_common/Errors';
import { LoadingProgress, LoadingFailed } from '../../_common/progress';
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

  if (snapshot.loading) {
    return (
      <Card sx={{ display: 'flex', p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">{title}</Typography>
        </Box>
        <Box>
          <LoadingProgress />
        </Box>
      </Card>
    );
  }

  if (snapshot.complete) {
    return (
      <Card>
        <CardActionArea component={RouterLink} to={navigateTo} sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle2">{title}</Typography>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
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
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card sx={{ display: 'flex', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Stack spacing={1}>
          <Typography variant="subtitle2">{title}</Typography>
          <Stack direction="row" spacing={1}>
            <ApiErrorTooltip error={snapshot.error} />
            <Typography variant="body2">
              Something went wrong fetching your data, if this continues please contact &nbsp;
              <Link href="mailto:support@airslip.com">support@airslip.com</Link>
            </Typography>
          </Stack>
        </Stack>
      </Box>
      <Box>
        <LoadingFailed />
      </Box>
    </Card>
  );
}
