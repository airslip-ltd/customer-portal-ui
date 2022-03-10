// material
import PropTypes from 'prop-types';
import { Container, Box } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// hooks
import useSettings from '../hooks/useSettings';
// components
import Page from '../components/Page';
import HeaderBreadcrumbs from '../components/HeaderBreadcrumbs';

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
  fullWidth: PropTypes.bool
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
  fullWidth
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

        <>{children}</>
      </Container>
    </Page>
  );
}
