import PropTypes from 'prop-types';
import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import ReactApexChart from 'react-apexcharts';
import personFill from '@iconify/icons-eva/clipboard-outline';
// material
import { useTheme, styled } from '@mui/material/styles';
import { Card, Typography, Box } from '@mui/material';
// utils
import { fNumber } from '../../../utils/formatNumber';
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 120,
  height: 120,
  opacity: 0.12,
  position: 'absolute',
  right: theme.spacing(-3),
  color: theme.palette.common.white
}));

// ----------------------------------------------------------------------

MerchantRiskScore.propTypes = {
  rating: PropTypes.number
};

export default function MerchantRiskScore({ rating }) {
  const theme = useTheme();

  const RootStyle = styled(Card)(({ theme }) => ({
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    padding: theme.spacing(3),
    backgroundColor:
      (rating <= 30 && theme.palette.success.main) ||
      (rating > 30 && rating <= 70 && theme.palette.warning.main) ||
      theme.palette.error.main
  }));

  const chartOptions = merge(BaseOptionChart(), {
    chart: { sparkline: { enabled: true } },
    legend: { show: false },
    plotOptions: {
      radialBar: {
        hollow: { size: '78%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            color: theme.palette.common.white,
            fontSize: theme.typography.subtitle2.fontSize
          }
        }
      }
    }
  });

  return (
    <RootStyle>
      <ReactApexChart type="radialBar" series={[rating]} options={chartOptions} width={86} height={86} />
      <Box sx={{ ml: 3, color: 'common.white' }}>
        <Typography variant="h4"> {fNumber(rating)}% </Typography>
        <Typography variant="body2" sx={{ opacity: 0.72 }}>
          Risk Score
        </Typography>
      </Box>
      <IconStyle icon={personFill} />
    </RootStyle>
  );
}
