// material
import { Grid, Stack, Typography } from '@mui/material';
// layouts
import ExternalFixedLayout from '../../layouts/ExternalFixedLayout';
// components
import { LoginForm } from '../../components/authentication/login';
import { RegisterForm } from '../../components/authentication/register';

// ----------------------------------------------------------------------

export default function GetStarted() {
  return (
    <ExternalFixedLayout title="Getting Started">
      <Stack spacing={3} sx={{ pb: 3 }}>
        <Typography variant="h3">Welcome to Airslip</Typography>
      </Stack>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <LoginForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <RegisterForm />
        </Grid>
      </Grid>
    </ExternalFixedLayout>
  );
}
