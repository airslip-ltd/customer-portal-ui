// material
import { styled } from '@mui/material/styles';
import { Box, Grid, Stack, Link, Container, Typography } from '@mui/material';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { LoginForm } from '../../components/authentication/login';
import { RegisterForm } from '../../components/authentication/register';

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
    <RootStyle title="Login | Airslip">
      <AuthLayout />

      <Container>
        <ContentStyle>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Use your existing Airslip account
                  </Typography>
                </Box>
              </Stack>

              <LoginForm />
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" gutterBottom>
                    Or create one, completely free.
                  </Typography>
                </Box>
              </Box>
              <RegisterForm />

              <Typography variant="body2" align="center" sx={{ color: 'text.secondary', mt: 3 }}>
                By registering, I agree to our&nbsp;
                <Link underline="always" color="text.primary" href="#">
                  Terms of Service
                </Link>
                &nbsp;and&nbsp;
                <Link underline="always" color="text.primary" href="#">
                  Privacy Policy
                </Link>
                .
              </Typography>
            </Grid>
          </Grid>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
