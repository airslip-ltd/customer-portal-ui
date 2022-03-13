import PropTypes from 'prop-types';
// material
import { Grid, Stack } from '@mui/material';
//
import BusinessAbout from './BusinessAbout';

// ----------------------------------------------------------------------

BusinessProfile.propTypes = {
  business: PropTypes.object
};

export default function BusinessProfile({ business }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <BusinessAbout business={business} />
        </Stack>
      </Grid>
    </Grid>
  );
}
