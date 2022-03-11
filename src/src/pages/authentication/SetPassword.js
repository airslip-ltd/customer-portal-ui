import { useEffect, useCallback, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { setPassword, reset } from '../../redux/slices/auth';
// components
import Page from '../../components/Page';
import { SetPasswordForm } from '../../components/authentication/reset-password';
//
import { SentIcon } from '../../assets';
import ApiError from '../../components/_common/Errors/ApiError';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function SetPassword() {
  const [searchParams] = useSearchParams();
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const { password } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSend = (newPassword, confirm) => {
    dispatch(setPassword(newPassword, confirm, email, token));
  };

  useEffect(() => {
    setEmail(searchParams.get('email'));
    setToken(searchParams.get('token'));
  }, [searchParams]);

  const handleBack = useCallback(() => {
    dispatch(reset());
    navigate(PATH_AUTH.login);
  }, [dispatch, navigate]);

  return (
    <RootStyle title="Reset Password | Minimal UI">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!password.complete ? (
            <>
              <Typography variant="h3" paragraph>
                Create a password
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>Please enter your new password below.</Typography>
              <ApiError error={password.error} />

              <SetPasswordForm onRequest={handleSend} />

              <Button fullWidth size="large" onClick={handleBack} sx={{ mt: 1 }}>
                Return to Login
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Password reset successfully
              </Typography>
              <Typography>
                Thank you, we have reset your password for address
                <strong>{email}</strong>
              </Typography>

              <Button size="large" variant="contained" onClick={handleBack} sx={{ mt: 5 }}>
                Return to Login
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
