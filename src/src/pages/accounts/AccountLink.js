import { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Card, Container, Grid, Stack, Typography, CardActionArea, CardContent } from '@mui/material';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBankList } from '../../redux/slices/banks';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
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
  const { bankList } = useSelector((state) => state.bank);

  useEffect(() => {
    dispatch(getBankList());
  }, [dispatch]);

  return (
    <Page title="Accounts | List | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Account Link"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Accounts', href: PATH_DASHBOARD.accounts.root },
            { name: 'Link' }
          ]}
        />

        <Grid container spacing={3} justify="center">
          <Grid item xs={12}>
            <Typography noWrap variant="body" sx={{ color: 'text.secondary' }}>
              Let's get started with linking your bank account to Airslip! Start by selecting your bank from the options
              below.
            </Typography>
          </Grid>

          {bankList.map((row) => {
            const { bankId, bankName } = row;

            return (
              <Grid key={bankId} item xs={6} md={4} align="center">
                <Card sx={{ display: 'flex', alignItems: 'center' }} align="center">
                  <CardActionArea component={RouterLink} to={`${PATH_DASHBOARD.accounts.root}/${bankId}/link`}>
                    <CardContent align="center">
                      <Stack style={{ margin: 'auto' }} spacing={2}>
                        <BankImage icon={bankId} />
                        <Typography noWrap variant="h6" sx={{ color: 'text.secondary' }}>
                          {bankName}
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
