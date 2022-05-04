// material
import { Box, Collapse, IconButton, Stack, Typography } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';
// layouts
import { useCallback } from 'react';
import ExternalFixedLayout from '../../layouts/ExternalFixedLayout';
// redux
import { useSelector, useDispatch } from '../../redux/store';
import { reset } from '../../redux/slices/auth';
// components
import { CheckEmailForm, LoginForm } from '../../components/authentication/login';
import { RegisterForm } from '../../components/authentication/register';
// redux

// ----------------------------------------------------------------------

export default function GetStarted() {
  const { check } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleBack = useCallback(() => {
    dispatch(reset());
  }, [dispatch]);

  return (
    <ExternalFixedLayout
      title="Getting Started"
      size="small"
      header={
        <Stack spacing={3}>
          <Box sx={{ display: 'flex' }}>
            <Collapse in={check.complete} orientation="horizontal">
              <IconButton size="small" onClick={handleBack} sx={{ mt: '7px', mr: '10px' }}>
                <ArrowBack />
              </IconButton>
            </Collapse>
            <Typography variant="h3">Welcome to Airslip</Typography>
          </Box>
        </Stack>
      }
    >
      <Collapse in={!check.complete}>
        <CheckEmailForm />
      </Collapse>
      <Collapse in={check.complete && !check.response.isNewUser}>
        {check.complete && <LoginForm email={check.response.email} />}
      </Collapse>
      <Collapse in={check.complete && check.response.isNewUser}>
        {check.complete && <RegisterForm email={check.response.email} />}
      </Collapse>
    </ExternalFixedLayout>
  );
}
