import PropTypes from 'prop-types';
// material
import { Card, CardHeader, CardContent } from '@mui/material';
import { NameValueItem, NameValueList } from '../../../_common';

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  user: PropTypes.object
};

export default function ProfileAbout({ user }) {
  const { firstName, lastName, displayName, email } = user;

  return (
    <Card>
      <CardHeader title="About" />

      <CardContent sx={{ pt: 1 }}>
        <NameValueList>
          <NameValueItem name="First Name" value={firstName} />
          <NameValueItem name="Last Name" value={lastName} />
          <NameValueItem name="Display Name" value={displayName} />
          <NameValueItem name="Email" value={email} />
        </NameValueList>
      </CardContent>
    </Card>
  );
}
