import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Card, Typography, Stack } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getCurrentBalance } from '../../../redux/slices/analytics';

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

export default function MerchantInterestCharges() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { currentBalance } = useSelector((state) => state.analytics);
  const [chartData, setChartData] = useState([5, 5, 5, 5, 5, 5, 5, 5, 5, 5]);
  const CHART_DATA = [
    {
      data: chartData
    }
  ];

  useEffect(() => {
    dispatch(getCurrentBalance());
  }, [dispatch]);

  useEffect(() => {
    if (!currentBalance.metrics) return;
    const newData = currentBalance.metrics.map((metric) => metric.balance);
    console.log(newData);
    setChartData(newData);
  }, [currentBalance, setChartData]);

  const chartOptions = {
    colors: [theme.palette.chart.red[0]],
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

  return (
    <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle2">Cash in bank</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
          <IconWrapperStyle
            sx={{
              ...(currentBalance.movement < 0 && {
                color: 'error.main',
                bgcolor: alpha(theme.palette.error.main, 0.16)
              })
            }}
          >
            <Icon width={16} height={16} icon={currentBalance.movement >= 0 ? trendingUpFill : trendingDownFill} />
          </IconWrapperStyle>
          <Typography component="span" variant="subtitle2">
            {currentBalance.movement > 0 && '+'}
            {fPercent(currentBalance.movement)}
          </Typography>
        </Stack>

        <Typography variant="h3">&pound;{fNumber(currentBalance.balance)}</Typography>
      </Box>

      {chartData && <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} width={60} height={36} />}
    </Card>
  );
}
