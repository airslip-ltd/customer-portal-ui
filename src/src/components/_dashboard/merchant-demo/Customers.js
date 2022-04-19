import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
import PropTypes from 'prop-types';
// material
import { Box, Card, CardHeader, CardActionArea } from '@mui/material';
//
import { Link as RouterLink } from 'react-router-dom';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const CHART_DATA = [{ data: [400, 430, 448, 470, 540, 580, 690, 1100, 12000, 421000] }];

Customers.propTypes = {
  accountId: PropTypes.string
};
export default function Customers({ accountId }) {
  // demo
  accountId = accountId || '9666f117cf604743a346c80d9a66a7e5';

  const chartOptions = merge(BaseOptionChart(), {
    tooltip: {
      marker: { show: false },
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: () => ''
        }
      }
    },
    plotOptions: {
      bar: { horizontal: true, barHeight: '28%', borderRadius: 2 }
    },
    xaxis: {
      categories: [
        'Taichie',
        'Ultient',
        'Yuka',
        'Wemoto',
        'Tomoyori',
        'Genibot',
        'Dopoping',
        'Visujki',
        'Nativi',
        'Atori'
      ]
    }
  });

  return (
    <Card>
      <CardActionArea component={RouterLink} to={`${PATH_DASHBOARD.analytics.customersDetail}/${accountId}`}>
        <CardHeader title="Customers" subheader="(+43%) than last year" />
        <Box sx={{ mx: 3 }} dir="ltr">
          <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
        </Box>
      </CardActionArea>
    </Card>
  );
}
