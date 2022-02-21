import PropTypes from 'prop-types';

import { Card, Typography, Box, CardActionArea } from '@mui/material';

// routes
import { Link as RouterLink } from 'react-router-dom';
import { PATH_DASHBOARD } from '../../../routes/paths';

// demo-data
import { demoData } from '../../../utils/demo-data/NewVsReturningCustomers';

import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

NewVsReturningCustomers.propTypes = {
  accountId: PropTypes.string
};
export default function NewVsReturningCustomers({ accountId }) {
  accountId = accountId || '';

  return (
    <Card>
      <CardActionArea
        component={RouterLink}
        to={PATH_DASHBOARD.analytics.commerceSummary}
        sx={{ display: 'flex', alignItems: 'center', p: 3 }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="subtitle2">New Vs Returning Customers</Typography>
          <div Style="display: inline-block;">
            <Typography variant="h3">{fShortenNumber(demoData[accountId].new)}</Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              New
            </Typography>
          </div>
          <div Style="display: inline-block; margin-left: 40%">
            <Typography variant="h3">{fShortenNumber(demoData[accountId].returning)}</Typography>
            <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
              Returning
            </Typography>
          </div>
        </Box>
      </CardActionArea>
    </Card>
  );
}
