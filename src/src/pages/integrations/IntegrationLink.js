import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Container, Grid, Stack, Typography, CardActionArea, CardContent } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviders } from '../../redux/slices/providers';
// routes
import { PATH_INTEGRATE, PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { ProviderImage } from '../../components/_dashboard/integration-list';

// ----------------------------------------------------------------------

export default function IntegrationLink() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { providers } = useSelector((state) => state.provider);

  useEffect(() => {
    dispatch(getProviders());
  }, [dispatch]);

  ProviderSelector.propTypes = {
    provider: PropTypes.string.isRequired,
    integration: PropTypes.string.isRequired,
    integrationType: PropTypes.string.isRequired,
    imageType: PropTypes.string
  };

  function ProviderSelector({ provider, integration, integrationType, imageType }) {
    return (
      <Grid item xs={6} md={4} align="center">
        <Card sx={{ display: 'flex', alignItems: 'center' }} align="center">
          <CardActionArea component={RouterLink} to={`${PATH_INTEGRATE.authorise}/${provider}/${integration}`}>
            <CardContent align="center">
              <Stack style={{ margin: 'auto' }} spacing={2}>
                <ProviderImage icon={integration} integrationType={integrationType} imageType={imageType} />
              </Stack>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }

  ProviderList.propTypes = {
    integrationType: PropTypes.string.isRequired,
    imageType: PropTypes.string
  };

  function ProviderList({ integrationType, imageType }) {
    return (
      <>
        <Grid item xs={12}>
          <Typography variant="h4">{integrationType}</Typography>
        </Grid>
        {providers.response.results
          .filter((row) => row.integrationType === integrationType)
          .map((row) => {
            const { id, integrationType, provider } = row;
            return (
              <ProviderSelector
                key={id}
                provider={provider}
                integration={id}
                integrationType={integrationType}
                imageType={imageType}
              />
            );
          })}
      </>
    );
  }

  return (
    <Page title="Integrations | Link | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Connect Integration"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Commerce', href: PATH_DASHBOARD.integrations.root },
            { name: 'Link' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography noWrap variant="body" sx={{ color: 'text.secondary' }}>
              Let's connect a commerce and accounting provider. By connecting your commerce and accounting providers,
              you can visualise your data to make improved decisions and get access to more financial products.
            </Typography>
          </Grid>
          {providers.hasData && (
            <>
              <ProviderList integrationType="Banking" imageType="svg" />
              <ProviderList integrationType="Commerce" />
              <ProviderList integrationType="Accounting" />
            </>
          )}
        </Grid>
      </Container>
    </Page>
  );
}
