// material
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import ProviderSelection from '../../components/_dashboard/integration-list/ProviderSelection';

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

export default function SetupIntegration() {
  return (
    <RootStyle title="Login | Airslip">
      <AuthLayout />

      <Container>
        <ContentStyle>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ProviderSelection />
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
