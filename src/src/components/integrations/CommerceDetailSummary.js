import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { NameValueDisplay } from '.';

// ----------------------------------------------------------------------

CommerceDetailSummary.propTypes = {
  providerDetail: PropTypes.object.isRequired
};

export default function CommerceDetailSummary({ providerDetail }) {
  return (
    <Stack>
      <NameValueDisplay name="Store" value={providerDetail.name} />
    </Stack>
  );
}
