import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, CardHeader, CardContent, CardActionArea } from '@mui/material';
import { LoadingView } from '.';

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

LoadingCard.propTypes = {
  apiRequest: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  navigateTo: PropTypes.string
};

export default function LoadingCard({ apiRequest, children, title, navigateTo }) {
  return (
    <Card>
      <IsClickable to={navigateTo}>
        <CardHeader title={title} />
        <CardContent>
          <LoadingView apiRequest={apiRequest}>{children}</LoadingView>
        </CardContent>
      </IsClickable>
    </Card>
  );
}
