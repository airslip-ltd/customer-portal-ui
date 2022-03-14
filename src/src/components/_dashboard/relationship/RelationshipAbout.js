import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
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

RelationshipAbout.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipAbout({ relationship }) {
  const { invitationDetails } = relationship;

  return (
    <Card>
      <CardHeader title="Invitation Details" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Business &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {invitationDetails.businessName}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Contact &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {invitationDetails.firstName} {invitationDetails.lastName}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Email &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {invitationDetails.email}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Phone &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {invitationDetails.phoneNumber}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
