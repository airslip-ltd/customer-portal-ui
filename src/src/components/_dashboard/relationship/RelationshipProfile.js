import PropTypes from 'prop-types';
// material
import { Grid, Stack } from '@mui/material';
//
import { RelationshipAccess, RelationshipAbout, RelationshipReferral } from '.';

// ----------------------------------------------------------------------

RelationshipProfile.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipProfile({ relationship }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <RelationshipAbout relationship={relationship} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <RelationshipAccess relationship={relationship} />
        </Stack>
      </Grid>
      <Grid item xs={12} md={4}>
        <Stack spacing={3}>
          <RelationshipReferral relationship={relationship} />
        </Stack>
      </Grid>
    </Grid>
  );
}
