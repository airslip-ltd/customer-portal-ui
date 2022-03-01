import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';

ConsentPreview.propTypes = {
  permissionType: PropTypes.string.isRequired
};

export default function ConsentPreview({ permissionType }) {
  const renderTitle = () => {
    switch (permissionType) {
      case 'Banking':
        return 'Banking Data';
      case 'Commerce':
        return 'Commerce Data';
      case 'Accounting':
        return 'Accounting Data';
      default:
        return 'Invalid type';
    }
  };

  const renderMessage = () => {
    switch (permissionType) {
      case 'Banking':
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis elit urna, eget pellentesque augue luctus congue. Maecenas eget ligula id dolor rutrum dictum.';
      case 'Commerce':
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis elit urna, eget pellentesque augue luctus congue. Maecenas eget ligula id dolor rutrum dictum.';
      case 'Accounting':
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis elit urna, eget pellentesque augue luctus congue. Maecenas eget ligula id dolor rutrum dictum.';
      default:
        return 'Invalid type';
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="subtitle1">{renderTitle()}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {renderMessage()}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
