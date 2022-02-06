import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// redux
import PropTypes from 'prop-types';
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

MerchantDashboardSeries.propTypes = {
  title: PropTypes.string.isRequired,
  years: PropTypes.array.isRequired,
  currentYear: PropTypes.number.isRequired,
  stats: PropTypes.object.isRequired,
  onYearChange: PropTypes.func.isRequired,
  colors: PropTypes.array
};

export default function MerchantDashboardSeries(props) {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    if (!props.stats.year) return;
    console.log(props.stats);

    setChartData(props.stats);
  }, [props.stats, setChartData]);

  const handleChangeYear = (event) => {
    props.onYearChange(Number(event.target.value));
  };

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    colors: props.colors || [
      theme.palette.chart.green[0],
      theme.palette.chart.red[0],
      theme.palette.primary.main,
      theme.palette.chart.yellow[0]
    ]
  });

  return (
    <Card>
      <CardHeader
        title={props.title}
        action={
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
        }
      />

      {chartData.series && (
        <Box sx={{ mt: 3, mx: 3 }} dir="ltr">
          <ReactApexChart type="line" series={chartData.series} options={chartOptions} height={364} />
        </Box>
      )}
    </Card>
  );
}
