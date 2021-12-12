import { merge } from 'lodash';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@mui/material';
//
import { useTheme, styled } from '@mui/material/styles';

import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 2021,
    data: [
      {
        name: 'Receivables',
        data: [35789, 44678, 46753, 48998, 48967, 49877, 44546, 46388, 47890, 46777, 40124, 55678]
      },
      {
        name: 'Payables',
        data: [34789, 34678, 41753, 42998, 42967, 41877, 47546, 48388, 49890, 44777, 41124, 54678]
      }
    ]
  },
  {
    year: 2022,
    data: [
      {
        name: 'Receivables',
        data: [45789, 54678, 56753, 78998, 78967, 79877, 84546, 86388, 87890, 86777, 90124, 105678]
      },
      {
        name: 'Payables',
        data: [42789, 51678, 52753, 72998, 79967, 78877, 81546, 83388, 89890, 88777, 91124, 115678]
      }
    ]
  }
];

export default function AppAreaInstalled() {
  const [seriesData, setSeriesData] = useState(2021);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const theme = useTheme();

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.chart.green[0],
      theme.palette.chart.red[0],
      theme.palette.chart.yellow[0]
    ]
  });

  return (
    <Card>
      <CardHeader
        title="Cashflow"
        subheader="(+13%) than last year"
        action={
          <TextField
            select
            fullWidth
            value={seriesData}
            SelectProps={{ native: true }}
            onChange={handleChangeSeriesData}
            sx={{
              '& fieldset': { border: '0 !important' },
              '& select': { pl: 1, py: 0.5, pr: '24px !important', typography: 'subtitle2' },
              '& .MuiOutlinedInput-root': { borderRadius: 0.75, bgcolor: 'background.neutral' },
              '& .MuiNativeSelect-icon': { top: 4, right: 0, width: 20, height: 20 }
            }}
          >
            {CHART_DATA.map((option) => (
              <option key={option.year} value={option.year}>
                {option.year}
              </option>
            ))}
          </TextField>
        }
      />

      {CHART_DATA.map((item) => (
        <Box key={item.year} sx={{ mt: 3, mx: 3 }} dir="ltr">
          {item.year === seriesData && (
            <ReactApexChart type="line" series={item.data} options={chartOptions} height={364} />
          )}
        </Box>
      ))}
    </Card>
  );
}
