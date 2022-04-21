// material
import PropTypes from 'prop-types';
import { Container, Box } from '@mui/material';
// routes
import { LoadingView } from '../components/_common/progress';
import { PATH_DASHBOARD } from '../routes/paths';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

ApiRequest.propTypes = {
  apiRequest: PropTypes.object,
  children: PropTypes.node.isRequired
};

function ApiRequest({ children, apiRequest }) {
  if (apiRequest) {
    return <LoadingView apiRequest={apiRequest}>{children}</LoadingView>;
  }

  return <>{children}</>;
}

// ----------------------------------------------------------------------

StandardPage.propTypes = {
  children: PropTypes.node.isRequired,
  actions: PropTypes.node,
  heading: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  space: PropTypes.string.isRequired,
  activity: PropTypes.string.isRequired,
  areaHref: PropTypes.string,
  spaceHref: PropTypes.string.isRequired,
  fullWidth: PropTypes.bool,
  apiRequest: PropTypes.object
};

export default function StandardPage({
  children,
  actions,
  area,
  areaHref,
  space,
  spaceHref,
  activity,
  heading,
  fullWidth,
  apiRequest
}) {
  const { themeStretch } = useSettings();
  const width = fullWidth ? 'xl' : 'lg';

  return (
    <Page title={`${area} | ${space} | ${activity} | Airslip `}>
      <Container maxWidth={themeStretch ? false : width}>
        <Box sx={{ display: 'flex' }}>
          <Box>
            <HeaderBreadcrumbs
              heading={heading}
              links={[
                { name: area, href: areaHref || PATH_DASHBOARD.root },
                { name: space, href: spaceHref },
                { name: activity }
              ]}
            />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box>{actions}</Box>
        </Box>

        <ApiRequest apiRequest={apiRequest}>{children}</ApiRequest>
      </Container>
    </Page>
  );
}
