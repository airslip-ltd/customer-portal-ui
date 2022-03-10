import PropTypes from 'prop-types';
// material
import { Grid, Stack } from '@mui/material';
//
import PartnerAbout from './PartnerAbout';

// ----------------------------------------------------------------------

Profile.propTypes = {
  partner: PropTypes.object
};

export default function Profile({ partner }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <PartnerAbout partner={partner} />
        </Stack>
      </Grid>
    </Grid>
  );
}
