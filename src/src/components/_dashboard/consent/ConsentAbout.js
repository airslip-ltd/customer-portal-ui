import PropTypes from 'prop-types';
// material
import { Card, CardHeader, CardContent } from '@mui/material';
import { NameValueItem, NameValueList } from '../../_common';

// ----------------------------------------------------------------------

ConsentAbout.propTypes = {
  consent: PropTypes.object
};

export default function ConsentAbout({ consent }) {
  const { partner } = consent;

  return (
    <Card>
      <CardHeader title="Invitation Details" />

      <CardContent sx={{ pt: 1 }}>
        <NameValueList>
          <NameValueItem name="Partner" value={partner.name} />
        </NameValueList>
      </CardContent>
    </Card>
  );
}
