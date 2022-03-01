// material
import { styled } from '@mui/material/styles';
import { Link, Grid, Container, Stack, Typography } from '@mui/material';
// layouts
import { FormSection } from '../../components/_common';
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import ConsentView from '../../components/consent/ConsentView';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 980,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function GetStarted() {
  return (
    <RootStyle title="Relationship | Consent | Airslip">
      <AuthLayout />

      <Container>
        <ContentStyle>
          <Grid container>
            <Grid item xs={5}>
              <FormSection
                title="Share your financial information for faster access to finance"
                message="You will be asked to sign in to your accounts in order to authorise sharing of your financial information"
              >
                <Stack direction="row" sx={{ my: 2 }}>
                  <Typography variant="body2">
                    We keep your data secure.&nbsp;
                    <Link
                      underline="always"
                      color="text.primary"
                      target="_blank"
                      rel="noopener"
                      href="https://www.airslip.com"
                    >
                      learn more
                    </Link>
                  </Typography>
                </Stack>
              </FormSection>
            </Grid>
            <Grid item xs={1} />
            <Grid item xs={6}>
              <ConsentView />
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
