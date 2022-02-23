import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Container, Grid, Stack, Typography, CardActionArea, CardContent } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBanks } from '../../redux/slices/providers';
// routes
import { PATH_DASHBOARD, PATH_INTEGRATE } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BankImage } from '../../components/_dashboard/account-list';

// ----------------------------------------------------------------------

export default function AccountLink() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { banks } = useSelector((state) => state.provider);

  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch]);

  return (
    <Page title="Banking | Link | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Connect Bank"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Banking', href: PATH_DASHBOARD.accounts.root },
            { name: 'Link' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography noWrap variant="body" sx={{ color: 'text.secondary' }}>
              Let's connect your bank. Banking data lets you visualise your banking data to help you access more
              financial products.
            </Typography>
          </Grid>

          {banks.hasData &&
            banks.response.results.map((row) => {
              const { id, tradingName } = row;
              return (
                <Grid key={id} item xs={6} md={4} align="center">
                  <Card sx={{ display: 'flex', alignItems: 'center' }} align="center">
                    <CardActionArea component={RouterLink} to={`${PATH_INTEGRATE.authorise}/yapily/${id}`}>
                      <CardContent align="center">
                        <Stack style={{ margin: 'auto' }} spacing={2}>
                          <BankImage icon={id} />
                          <Typography noWrap variant="h6" sx={{ color: 'text.secondary' }}>
                            {tradingName}
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
