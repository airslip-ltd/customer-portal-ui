import PropTypes from 'prop-types';
// material
import { Typography } from '@mui/material';
//
import { CoverStyle } from '../../_common';

// ----------------------------------------------------------------------

ApiKeyCover.propTypes = {
  apiKey: PropTypes.object
};

export default function ApiKeyCover({ apiKey }) {
  const { name } = apiKey;

  return (
    <CoverStyle displayName={name}>
      <Typography variant="h4">{name}</Typography>
    </CoverStyle>
  );
}
