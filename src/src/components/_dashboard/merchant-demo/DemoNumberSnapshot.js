import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import trendingUpFill from '@iconify/icons-eva/trending-up-fill';
import trendingDownFill from '@iconify/icons-eva/trending-down-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Typography, Stack, CardActionArea } from '@mui/material';
import LoadingProgress from '../../_common/progress/LoadingProgress';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

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

DemoNumberSnapshot.propTypes = {
  metricData: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  navigateTo: PropTypes.string.isRequired
};

export default function DemoNumberSnapshot({ metricData, title, navigateTo }) {
  const theme = useTheme();

  if (!metricData.metrics) {
    return (
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Grid container>
          <Grid item xs={12} md={8}>
            <Typography variant="subtitle2">{title}</Typography>
          </Grid>
          <Grid item xs={12} md={4}>
            <LoadingProgress />
          </Grid>
        </Grid>
      </Card>
    );
  }

  return (
    <Card>
      <CardActionArea component={RouterLink} to={navigateTo} sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">{title}</Typography>
          <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 1 }}>
            <IconWrapperStyle
              sx={{
                ...(metricData.movement < 0 && {
                  color: 'error.main',
                  bgcolor: alpha(theme.palette.error.main, 0.16)
                })
              }}
            >
              <Icon width={16} height={16} icon={metricData.movement >= 0 ? trendingUpFill : trendingDownFill} />
            </IconWrapperStyle>
            <Typography component="span" variant="subtitle2">
              {metricData.movement > 0 && '+'}
              {fShortenNumber(metricData.movement)}
            </Typography>
          </Stack>

          <Typography variant="h3">{metricData.balance}</Typography>
        </Box>
      </CardActionArea>
    </Card>
  );
}
