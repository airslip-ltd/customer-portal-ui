import PropTypes from 'prop-types';

import { Card, Typography, Box, CardActionArea, Grid } from '@mui/material';

// routes
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../routes/paths';

// demo-data
import { demoData } from '../../../utils/demo-data/ActiveVsChurnCustomers';

import { fShortenNumber, fPercent } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

ActiveVsChurnCustomers.propTypes = {
  accountId: PropTypes.string
};
export default function ActiveVsChurnCustomers({ accountId }) {
  accountId = accountId || '';

  return (
    <Card>
      <CardActionArea
        component={RouterLink}
        to={PATH_DASHBOARD.analytics.commerceSummary}
        sx={{ display: 'flex', alignItems: 'center', p: 3 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Active Customers
              </Typography>
              <Typography variant="h3">{fShortenNumber(demoData[accountId].active)}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
                Churn
              </Typography>
              <Typography variant="h3">{fPercent(demoData[accountId].churn)}</Typography>
            </Grid>
          </Grid>
        </Box>
      </CardActionArea>
    </Card>
  );
}
