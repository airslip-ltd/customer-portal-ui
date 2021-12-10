import { merge } from 'lodash';
import { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box, TextField } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [
  {
    year: 2021,
    data: [
      {
        name: 'Revenue',
        data: [45789, 54678, 56753, 78998, 78967, 79877, 84546, 86388, 87890, 86777, 90124, 105678]
      },
      {
        name: 'Refunds',
        data: [4121.01, 5467.8, 4540.24, 5529.86, 8686.37, 6390.16, 5918.22, 7774.92, 8789, 9545.47, 8111.16, 7397.46]
      }
    ]
  },
  {
    year: 2022,
    data: [
      {
        name: 'Revenue',
        data: [35789, 44678, 46753, 48998, 48967, 49877, 44546, 46388, 47890, 46777, 40124, 55678]
      },
      {
        name: 'Refunds',
        data: [3121.01, 4467.8, 3540.24, 5529.86, 4686.37, 3390.16, 4918.22, 5774.92, 3789, 6545.47, 7111.16, 6397.46]
      }
    ]
  }
];

export default function AppAreaInstalled() {
  const [seriesData, setSeriesData] = useState(2021);

  const handleChangeSeriesData = (event) => {
    setSeriesData(Number(event.target.value));
  };

  const chartOptions = merge(BaseOptionChart(), {
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    }
  });

  return (
    <Card>
      <CardHeader
        title="Revenue and Refunds"
        subheader="(+43%) than last year"
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
