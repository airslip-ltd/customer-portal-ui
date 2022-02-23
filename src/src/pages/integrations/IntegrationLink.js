import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Container, Grid, Stack, Typography, CardActionArea, CardContent } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviders } from '../../redux/slices/providers';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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

  return (
    <Page title="Commerce | Link | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Connect Commerce"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Commerce', href: PATH_DASHBOARD.integrations.root },
            { name: 'Link' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography noWrap variant="body" sx={{ color: 'text.secondary' }}>
              Let's connect a commerce provider. Commerce data lets you visualise your sales data to help you access
              more financial products.
            </Typography>
          </Grid>

          {providers.hasData &&
            providers.response.results.map((row) => {
              const { posProvider } = row;

              return (
                <Grid key={posProvider} item xs={6} md={4} align="center">
                  <Card sx={{ display: 'flex', alignItems: 'center' }} align="center">
                    <CardActionArea
                      component={RouterLink}
                      to={`${PATH_DASHBOARD.integrations.root}/${posProvider}/link`}
                    >
                      <CardContent align="center">
                        <Stack style={{ margin: 'auto' }} spacing={2}>
                          <ProviderImage icon={posProvider} />
                        </Stack>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </Page>
  );
}
