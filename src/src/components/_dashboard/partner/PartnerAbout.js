import PropTypes from 'prop-types';
// material
import { Card, CardHeader, CardContent } from '@mui/material';
import { NameValueItem, NameValueList } from '../../_common';

// ----------------------------------------------------------------------

PartnerAbout.propTypes = {
  partner: PropTypes.object
};

export default function PartnerAbout({ partner }) {
  const { name } = partner;

  return (
    <Card>
      <CardHeader title="About" />

      <CardContent sx={{ pt: 1 }}>
        <NameValueList>
          <NameValueItem name="Partner Name" value={name} />
        </NameValueList>
      </CardContent>
    </Card>
  );
}
