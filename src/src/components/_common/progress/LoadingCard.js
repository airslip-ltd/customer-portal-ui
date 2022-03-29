import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, CardHeader, CardContent, CardActionArea } from '@mui/material';
import { LoadingView } from '.';

// ----------------------------------------------------------------------

LoadingCard.propTypes = {
  apiRequest: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  navigateTo: PropTypes.string
};

export default function LoadingCard({ apiRequest, children, title, navigateTo }) {
  if (navigateTo) {
    return (
      <Card>
        <CardActionArea component={RouterLink} to={navigateTo}>
          <CardHeader title={title} />
          <CardContent>
            <LoadingView apiRequest={apiRequest}>{children}</LoadingView>
          </CardContent>
        </CardActionArea>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader title={title} />
      <CardContent>
        <LoadingView apiRequest={apiRequest}>{children}</LoadingView>
      </CardContent>
    </Card>
  );
}
