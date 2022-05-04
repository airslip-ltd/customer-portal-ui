// material
import { styled } from '@mui/material/styles';
import { Box, Button, Stack, Grid } from '@mui/material';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';

ExternalFixedLayout.propTypes = {
  children: PropTypes.node.isRequired,
  header: PropTypes.node,
  title: PropTypes.string.isRequired,
  size: PropTypes.string
};

// ----------------------------------------------------------------------

const ContentStyle = styled(Box)(({ theme }) => ({
  flexDirection: 'column',
  justifyContent: 'center',
  backgroundColor: '#fff',
  border: 'solid 1px #DBDBDB',
  padding: theme.spacing(3),
  marginBottom: theme.spacing(3),
  boxShadow: theme.customShadows.z16,
  [theme.breakpoints.up('xs')]: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3)
  },
  [theme.breakpoints.up('lg')]: {
    marginLeft: 0,
    marginRight: 0
  }
}));

const HeaderStyle = styled(Box)(({ theme }) => ({
  borderBottom: 'solid 1px #DBDBDB',
  padding: theme.spacing(1),
  marginBottom: theme.spacing(2)
}));

// ----------------------------------------------------------------------

const SmallGrid = ({ children }) => (
  <Grid container>
    <Grid item sm={2} md={3} lg={4} display={{ xs: 'none', sm: 'block' }} />
    <Grid item xs={12} sm={8} md={6} lg={4}>
      <ContentStyle>{children}</ContentStyle>
    </Grid>
    <Grid item sm={2} md={3} lg={4} display={{ xs: 'none', sm: 'block' }} />
  </Grid>
);
SmallGrid.propTypes = {
  children: PropTypes.node.isRequired
};

const MediumGrid = ({ children }) => (
  <Grid container>
    <Grid item md={1} lg={2} xl={3} display={{ xs: 'none', md: 'block' }} />
    <Grid item md={10} xs={12} lg={8} xl={6}>
      <ContentStyle>{children}</ContentStyle>
    </Grid>
    <Grid item md={1} lg={2} xl={3} display={{ xs: 'none', md: 'block' }} />
  </Grid>
);
MediumGrid.propTypes = {
  children: PropTypes.node.isRequired
};

const LargeGrid = ({ children }) => (
  <Grid container>
    <Grid item lg={1} xl={2} display={{ xs: 'none', lg: 'block' }} />
    <Grid item xs={12} lg={10} xl={8}>
      <ContentStyle>{children}</ContentStyle>
    </Grid>
    <Grid item lg={1} xl={2} display={{ xs: 'none', lg: 'block' }} />
  </Grid>
);
LargeGrid.propTypes = {
  children: PropTypes.node.isRequired
};

// ----------------------------------------------------------------------

export default function ExternalFixedLayout({ header, children, title, size }) {
  const { logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleHomeClicked = async () => {
    navigate('/');
  };

  return (
    <Page title={`${title} | Airslip`} color="#F1F1F1">
      <Stack>
        <Box sx={{ display: 'flex' }}>
          <Box sx={{ p: 3 }}>
            <Logo />
          </Box>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ p: 3 }}>
            {isAuthenticated && (
              <Stack direction="row" spacing={1}>
                <Button color="inherit" size="small" variant="outlined" onClick={handleLogout}>
                  Logout
                </Button>
                <Button variant="contained" size="small" onClick={handleHomeClicked}>
                  Home
                </Button>
              </Stack>
            )}
          </Box>
        </Box>

        {(!size || size === 'large') && (
          <LargeGrid>
            {header && <HeaderStyle>{header}</HeaderStyle>}
            {children}
          </LargeGrid>
        )}
        {size === 'medium' && (
          <MediumGrid>
            {header && <HeaderStyle>{header}</HeaderStyle>}
            {children}
          </MediumGrid>
        )}
        {size === 'small' && (
          <SmallGrid>
            {header && <HeaderStyle>{header}</HeaderStyle>}
            {children}
          </SmallGrid>
        )}
      </Stack>
    </Page>
  );
}
