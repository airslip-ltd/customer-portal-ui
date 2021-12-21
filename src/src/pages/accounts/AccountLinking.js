import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
// material
import { Container, Grid, Typography, Stack, Link } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBankList, requestConsent } from '../../redux/slices/banks';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { BankIcon } from '../../components/_dashboard/account-list';

// ----------------------------------------------------------------------

export default function AccountLinking() {
  const { themeStretch } = useSettings();
  const { institutionId } = useParams();
  const dispatch = useDispatch();
  const { bankList, consentUrl } = useSelector((state) => state.bank);
  const institution = bankList.find((bank) => bank.id === institutionId);

  useEffect(() => {
    dispatch(getBankList());
    dispatch(requestConsent('Yapily', institutionId));
  }, [dispatch, institutionId]);

  return (
    <Page title={`Accounts | Link | ${institution ? institution.tradingName : ''}`}>
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <HeaderBreadcrumbs
          heading="Link Your Account"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'Accounts', href: PATH_DASHBOARD.accounts.root },
            { name: 'Link', href: PATH_DASHBOARD.accounts.link },
            { name: institution ? institution.tradingName : '' }
          ]}
        />

        {institution && (
          <Grid container spacing={3} justify="center">
            <Grid item xs={12}>
              <Stack direction="row" alignItems="center" spacing={2}>
                <BankIcon icon={institution.id} />
                <Typography variant="subtitle2" noWrap>
                  Select the option below to link your account.
                </Typography>
                <Link href={consentUrl} underline="none" rel="noopener">
                  Authorise
                </Link>
              </Stack>
            </Grid>
          </Grid>
        )}
      </Container>
    </Page>
  );
}
