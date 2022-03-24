// material
import { styled } from '@mui/material/styles';
import { Container, Box, Button, Stack } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';

ExternalFixedLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 980,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(3, 0)
}));

// ----------------------------------------------------------------------

export default function ExternalFixedLayout({ children, title }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Page title={`${title} | Airslip`}>
      <Stack>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ p: 3 }}>
            <Logo />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ p: 3 }}>
            <Button fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
              Logout
            </Button>
          </Box>
        </Box>

        <Container>
          <ContentStyle>{children}</ContentStyle>
        </Container>
      </Stack>
    </Page>
  );
}
