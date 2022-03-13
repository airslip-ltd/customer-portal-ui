import PropTypes from 'prop-types';
// material
import { Grid, Stack } from '@mui/material';
//
import IntegrationAbout from './IntegrationAbout';

// ----------------------------------------------------------------------

IntegrationProfile.propTypes = {
  integration: PropTypes.object
};

export default function IntegrationProfile({ integration }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <IntegrationAbout integration={integration} />
        </Stack>
      </Grid>
    </Grid>
  );
}
