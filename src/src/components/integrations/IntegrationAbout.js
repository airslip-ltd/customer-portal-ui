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

IntegrationAbout.propTypes = {
  integration: PropTypes.object
};

export default function IntegrationAbout({ integration }) {
  const { name } = integration;

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row">
          <IconStyle icon={pinFill} />
          <Typography variant="body2">
            Integration Name &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {name}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
