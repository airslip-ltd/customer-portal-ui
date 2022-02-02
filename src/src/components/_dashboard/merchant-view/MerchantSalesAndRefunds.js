import { merge } from 'lodash';
import { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@mui/material';
import { useTheme } from '@mui/material/styles';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getRevenueByYear } from '../../../redux/slices/analytics';
//

import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const YEARS = [2022, 2021];

export default function MerchantSalesAndRefunds() {
  const dispatch = useDispatch();
  const [year, setYear] = useState(2022);
  const { revenueStats } = useSelector((state) => state.analytics);
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    dispatch(getRevenueByYear(year));
  }, [dispatch, year]);

  useEffect(() => {
    if (!revenueStats.year) return;
    console.log(revenueStats);

    setChartData(revenueStats);
  }, [revenueStats, setChartData]);

  const handleChangeYear = (event) => {
    setYear(Number(event.target.value));
  };

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    colors: [
      theme.palette.chart.green[0],
      theme.palette.chart.red[0],
      theme.palette.primary.main,
      theme.palette.chart.yellow[0]
    ]
  });

  return (
    <Card>
      <CardHeader
        title="Revenue and Refunds"
        action={
          <TextField
            select
            fullWidth
            value={year}
            SelectProps={{ native: true }}
            onChange={handleChangeYear}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
            }}
          >
            {YEARS.map((option) => (
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
