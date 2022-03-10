import PropTypes from 'prop-types';
// material
import { Grid, Stack } from '@mui/material';
//
import ProfileAbout from './ProfileAbout';

// ----------------------------------------------------------------------

Profile.propTypes = {
  user: PropTypes.object
};

export default function Profile({ user }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <ProfileAbout user={user} />
        </Stack>
      </Grid>
    </Grid>
  );
}
