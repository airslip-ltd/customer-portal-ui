import PropTypes from 'prop-types';
// material
import { Card, CardContent, CardHeader } from '@mui/material';
import { NameValueItem, NameValueList } from '../../_common';

// ----------------------------------------------------------------------

BusinessAbout.propTypes = {
  business: PropTypes.object
};

export default function BusinessAbout({ business }) {
  const { name } = business;

  return (
    <Card>
      <CardHeader title="About" />

      <CardContent sx={{ pt: 1 }}>
        <NameValueList>
          <NameValueItem name="Business Name" value={name} />
        </NameValueList>
      </CardContent>
    </Card>
  );
}
