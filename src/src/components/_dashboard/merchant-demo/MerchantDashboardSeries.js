import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField, CardActionArea } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
// redux
import PropTypes from 'prop-types';
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

MerchantDashboardSeries.propTypes = {
  title: PropTypes.string.isRequired,
  stats: PropTypes.object.isRequired,
  navigateTo: PropTypes.string,
  onYearChange: PropTypes.func,
  years: PropTypes.array,
  currentYear: PropTypes.number,
  colors: PropTypes.array,
  chartType: PropTypes.string
};

export default function MerchantDashboardSeries(props) {
  const [chartData, setChartData] = useState({});
  const { navigateTo, chartType } = props;
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!props.stats || !props.stats.series || !props.stats.series.length === 0) return;
    setChartData(props.stats);
    setCategories(props.stats.series[0].metrics.map((metric) => metric.description));
  }, [props.stats, setChartData, setCategories]);

  const handleChangeYear = (event) => {
    props.onYearChange(Number(event.target.value));
  };

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories
    },
    colors: props.colors || [
      theme.palette.chart.green[0],
      theme.palette.chart.red[0],
      theme.palette.primary.main,
      theme.palette.chart.yellow[0]
    ]
  });

  IsClickable.propTypes = {
    children: PropTypes.node.isRequired
  };

  function IsClickable(props) {
    const { children } = props;

    if (navigateTo) {
      return (
        <CardActionArea component={RouterLink} to={navigateTo}>
          {children}
        </CardActionArea>
      );
    }

    return <>{children}</>;
  }

  return (
    <Card>
      <IsClickable>
        <CardHeader
          title={props.title}
          action={
            props.years && (
              <TextField
                select
                fullWidth
                value={props.currentYear}
                SelectProps={{ native: true }}
                onChange={handleChangeYear}
                sx={{
                  '& fieldset': { border: '0 !important' },
                  '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
                  '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
                  '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
                }}
              >
                {props.years.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </TextField>
            )
          }
        />

        {chartData.series && (
          <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
            <ReactApexChart type={chartType} series={chartData.series} options={chartOptions} height={364} />
          </Box>
        )}
      </IsClickable>
    </Card>
  );
}
