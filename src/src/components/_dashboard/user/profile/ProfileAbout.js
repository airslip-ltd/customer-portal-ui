import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import emailFill from '@iconify/icons-eva/email-fill';
// material
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  user: PropTypes.object
};

export default function ProfileAbout({ user }) {
  const { firstName, lastName, displayName, email } = user;

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            First Name &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {firstName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Last Name &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {lastName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Display Name &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {displayName}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">{email}</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
