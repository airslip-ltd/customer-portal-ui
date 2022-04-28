import React from 'react';
import PropTypes from 'prop-types';
import { NameValueList, NameValueItem } from '../_common';

// ----------------------------------------------------------------------

CommerceDetailSummary.propTypes = {
  providerDetail: PropTypes.object.isRequired
};

export default function CommerceDetailSummary({ providerDetail }) {
  return (
    <NameValueList>
      <NameValueItem name="Store" value={providerDetail.name} />
    </NameValueList>
  );
}
