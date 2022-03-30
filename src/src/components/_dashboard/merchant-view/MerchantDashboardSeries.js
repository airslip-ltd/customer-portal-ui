import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import PropTypes from 'prop-types';
import { LoadingCard } from '../../_common/progress';
// redux
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

MerchantDashboardSeries.propTypes = {
  title: PropTypes.string.isRequired,
  apiRequest: PropTypes.object.isRequired,
  navigateTo: PropTypes.string,
  colors: PropTypes.array,
  chartType: PropTypes.string
};

export default function MerchantDashboardSeries({ title, apiRequest, navigateTo, colors, chartType }) {
  const [chartData, setChartData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!apiRequest.complete) return;

    setChartData(apiRequest.response);
    setCategories(apiRequest.response.series[0].metrics.map((metric) => metric.description));
  }, [apiRequest, setChartData, setCategories]);

  const theme = useTheme();
  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories
    },
    colors: colors || [
      theme.palette.chart.green[0],
      theme.palette.chart.red[0],
      theme.palette.primary.main,
      theme.palette.chart.yellow[0]
    ]
  });

  return (
    <LoadingCard apiRequest={apiRequest} title={title} navigateTo={navigateTo}>
      <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
        {chartData.series && (
          <ReactApexChart type={chartType} series={chartData.series} options={chartOptions} height={364} />
        )}
      </Box>
    </LoadingCard>
  );
}
