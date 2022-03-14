import PropTypes from 'prop-types';
// material
import { Grid, Stack } from '@mui/material';
//
import { ConsentAccess, ConsentAbout } from '.';

// ----------------------------------------------------------------------

ConsentProfile.propTypes = {
  consent: PropTypes.object
};

export default function ConsentProfile({ consent }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ConsentAbout consent={consent} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ConsentAccess consent={consent} />
        </Stack>
      </Grid>
    </Grid>
  );
}
