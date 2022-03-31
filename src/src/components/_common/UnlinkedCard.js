import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, CardHeader, CardContent, CardActionArea, Typography, Button, Stack } from '@mui/material';
// paths
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

IsClickable.propTypes = {
  to: PropTypes.string,
  children: PropTypes.node.isRequired
};

function IsClickable({ children, to }) {
  if (to) {
    return (
      <CardActionArea component={RouterLink} to={to}>
        {children}
      </CardActionArea>
    );
  }

  return <>{children}</>;
}

// ----------------------------------------------------------------------

UnlinkedCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
  requiredService: PropTypes.string.isRequired,
  navigateTo: PropTypes.string
};

export default function UnlinkedCard({ children, title, navigateTo, requiredService }) {
  return (
    <Card>
      <IsClickable to={navigateTo}>
        <CardHeader title={title} />
        <CardContent>
          <Stack spacing={2}>
            <Typography variant="body2">It looks like you haven't linked a {requiredService} service.</Typography>{' '}
            <Button
              to={PATH_DASHBOARD.integrations.create}
              size="small"
              variant="outlined"
              component={RouterLink}
              fullWidth
            >
              Link one Now
            </Button>
            <>{children}</>
          </Stack>
        </CardContent>
      </IsClickable>
    </Card>
  );
}
