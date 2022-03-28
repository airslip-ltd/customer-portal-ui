import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme } from '@mui/material/styles';
import { Card, CardHeader, Stack, Box, Typography } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getConnections } from '../../../redux/slices/relationship';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

Legend.propTypes = {
  label: PropTypes.string,
  number: PropTypes.number,
  color: PropTypes.string
};

function Legend({ label, number, color }) {
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Stack direction="row" alignItems="center" spacing={1}>
        <Box
          sx={{
            width: 16,
            height: 16,
            bgcolor: 'grey.50016',
            borderRadius: 0.75,
            ...(color && {
              bgcolor: color
            })
          }}
        />
        <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {label}
        </Typography>
      </Stack>
      <Typography variant="subtitle1">{number}</Typography>
    </Stack>
  );
}

export default function ConnectedBusinesses() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { connections } = useSelector((state) => state.relationship);
  const [invited, setInvited] = useState(0);
  const [series, setSeries] = useState([]);

  useEffect(() => {
    dispatch(getConnections());
  }, [dispatch]);

  useEffect(() => {
    if (!connections.hasData) return;
    const result = connections.response.results.reduce((total, currentValue) => (total += currentValue.count), 0);
    setInvited(result);
    const invited = connections.response.results.find((res) => res.relationshipStatus === 'Approved');
    let count = invited ? invited.count : 0;
    if (count > 0) count = (count / result) * 100;
    setSeries([count]);
  }, [connections, setInvited]);

  const colorForStatus = (status) => {
    switch (status) {
      case 'Approved':
        return 'primary.main';
      default:
        return null;
    }
  };

  const labelForStatus = (status) => {
    switch (status) {
      case 'Approved':
        return 'Accepted Invitation';
      case 'Invited':
        return 'Awaiting Response';
      default:
        return null;
    }
  };

  const chartOptions = merge(BaseOptionChart(), {
    legend: { show: false },
    grid: {
      padding: { top: -32, bottom: -32 }
    },
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          [
            { offset: 0, color: theme.palette.primary.light },
            { offset: 15, color: theme.palette.primary.main }
          ]
        ]
      }
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        dataLabels: {
          name: { offsetY: -16 },
          value: { offsetY: 8 },
          total: {
            label: 'Total',
            formatter: () => fNumber(invited)
          }
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Connected Businesses" sx={{ mb: 8 }} />
      {connections.hasData && (
        <>
          <ReactApexChart type="radialBar" series={series} options={chartOptions} height={310} />

          <Stack spacing={2} sx={{ p: 5 }}>
            {connections.response.results.map((connection) => (
              <Legend
                key={connection.relationshipStatus}
                label={labelForStatus(connection.relationshipStatus)}
                number={connection.count}
                color={colorForStatus(connection.relationshipStatus)}
              />
            ))}
          </Stack>
        </>
      )}
    </Card>
  );
}
