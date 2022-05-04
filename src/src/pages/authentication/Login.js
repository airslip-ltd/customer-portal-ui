import ExternalFixedLayout from '../../layouts/ExternalFixedLayout';
import { LoginForm } from '../../components/authentication/login';

// ----------------------------------------------------------------------

export default function Login() {
  return (
    <ExternalFixedLayout title="Login | Airslip" size="small">
      <LoginForm />
    </ExternalFixedLayout>
  );
}
