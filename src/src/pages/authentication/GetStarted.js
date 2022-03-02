// material
import { Grid } from '@mui/material';
// layouts
import ExternalFlexLayout from '../../layouts/ExternalFlexLayout';
// components
import { LoginForm } from '../../components/authentication/login';
import { RegisterForm } from '../../components/authentication/register';

// ----------------------------------------------------------------------

export default function GetStarted() {
  return (
    <ExternalFlexLayout title="Getting Started">
      <Grid container spacing={3}>
        <Grid item xs={12} md={5}>
          <LoginForm />
        </Grid>
        <Grid item xs={12} md={1} />
        <Grid item xs={12} md={6}>
          <RegisterForm />
        </Grid>
      </Grid>
    </ExternalFlexLayout>
  );
}
