import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Button, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { forgotPassword, reset } from '../../redux/slices/auth';
// components
import { ResetPasswordForm } from '../../components/authentication/reset-password';
//
import { SentIcon } from '../../assets';
import ApiError from '../../components/_common/Errors/ApiError';
import ExternalFixedLayout from '../../layouts/ExternalFixedLayout';

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const [email, setEmail] = useState('');
  const { forgot } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSend = (newEmail) => {
    setEmail(newEmail);
    dispatch(forgotPassword(newEmail));
  };

  const handleBack = useCallback(() => {
    dispatch(reset());
    navigate(PATH_AUTH.login);
  }, [dispatch, navigate]);

  return (
    <ExternalFixedLayout title="Reset Password | Airslip" size="small">
      <Box>
        {!forgot.complete ? (
          <>
            <Typography variant="h3" paragraph>
              Forgot your password?
            </Typography>
            <Typography sx={{ color: 'text.secondary', mb: 5 }}>
              Please enter the email address associated with your account and We will email you a link to reset your
              password.
            </Typography>
            <ApiError error={forgot.error} />

            <ResetPasswordForm onRequest={handleSend} isLoading={forgot.loading} />

            <Button fullWidth variant="outlined" size="medium" onClick={handleBack} sx={{ mt: 1 }}>
              Back
            </Button>
          </>
        ) : (
          <Box sx={{ textAlign: 'center' }}>
            <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

            <Typography variant="h3" gutterBottom>
              Request sent successfully
            </Typography>
            <Typography>
              We have sent a confirmation email to&nbsp;
              <strong>{email}</strong>
              <br />
              Please check your email.
            </Typography>

            <Button size="medium" variant="contained" onClick={handleBack} sx={{ mt: 5 }}>
              Back
            </Button>
          </Box>
        )}
      </Box>
    </ExternalFixedLayout>
  );
}
