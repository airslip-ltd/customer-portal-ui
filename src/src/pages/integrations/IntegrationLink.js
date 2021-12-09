import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Container, Grid, Stack, Typography, CardActionArea, CardContent } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviderList } from '../../redux/slices/providers';
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
  const { providerList } = useSelector((state) => state.provider);

  useEffect(() => {
    dispatch(getProviderList());
  }, [dispatch]);

  return (
    <Page title="Accounts | List | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Integrations Link"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Integrations', href: PATH_DASHBOARD.integrations.root },
            { name: 'Link' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography noWrap variant="body" sx={{ color: 'text.secondary' }}>
              Let's add an integration. Integrations help you get the most out of Airslip!
            </Typography>
          </Grid>

          {providerList.map((row) => {
            const { provider, name } = row;

            return (
              <Grid key={provider} item xs={6} md={4} align="center">
                <Card sx={{ display: 'flex', alignItems: 'center' }} align="center">
                  <CardActionArea component={RouterLink} to={`${PATH_DASHBOARD.integrations.root}/${provider}/link`}>
                    <CardContent align="center">
                      <Stack style={{ margin: 'auto' }} spacing={2}>
                        <ProviderImage icon={provider} />
                        <Typography noWrap variant="h6" sx={{ color: 'text.secondary' }}>
                          {name}
                        </Typography>
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
