import { Stack, Typography } from '@mui/material';
import ExternalFixedLayout from '../../layouts/ExternalFixedLayout';
import { LoginForm } from '../../components/authentication/login';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <ExternalFixedLayout title="Login | Airslip" size="small">
      <Stack spacing={3}>
        <Typography variant="h3">Welcome to Airslip</Typography>
        <LoginForm />
      </Stack>
    </ExternalFixedLayout>
  );
}
