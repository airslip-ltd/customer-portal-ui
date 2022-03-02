// material
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// layouts
import PropTypes from 'prop-types';
import AuthLayout from './AuthLayout';
// components
import Page from '../components/Page';

ExternalFlexLayout.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired
};

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

export default function ExternalFlexLayout({ children, title }) {
  return (
    <RootStyle title={`${title} | Airslip`}>
      <AuthLayout />

      <Container>
        <ContentStyle>{children}</ContentStyle>
      </Container>
    </RootStyle>
  );
}
