import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Typography, Stack } from '@mui/material';
import LoadingProgress from '../../LoadingProgress';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getSalesShapshot } from '../../../redux/slices/analytics';
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

export default function MerchantRevenue() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { salesStats } = useSelector((state) => state.analytics);
  const [chartData, setChartData] = useState([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
  const CHART_DATA = [
    {
      data: chartData
    }
  ];

  useEffect(() => {
    dispatch(getSalesShapshot());
  }, [dispatch]);

  useEffect(() => {
    if (!salesStats.metrics) return;
    const newData = salesStats.metrics.map((metric) => metric.balance);
    setChartData(newData);
  }, [salesStats, setChartData]);

  const chartOptions = {
    colors: [theme.palette.primary.main],
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

  if (!salesStats.dayRange) {
    return (
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2">Revenue</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <LoadingProgress />
          </Grid>
        </Grid>
      </Card>
    );
  }

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Revenue (Last {salesStats.dayRange} days)</Typography>
        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(salesStats.movement < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={salesStats.movement >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {salesStats.movement > 0 && '+'}
            {fPercent(salesStats.movement)}
          </Typography>
        </Stack>

        <Typography variant="h3">&pound;{fNumber(salesStats.balance)}</Typography>
      </Box>

      <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} width={60} height={36} />
    </Card>
  );
}
