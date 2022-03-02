// material
import { styled } from '@mui/material/styles';
import { Container } from '@mui/material';
// layouts
import PropTypes from 'prop-types';
import AuthLayout from './AuthLayout';
// components
import Page from '../components/Page';

ExternalFixedLayout.propTypes = {
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
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ExternalFixedLayout({ children, title }) {
  return (
    <RootStyle title={`${title} | Airslip`}>
      <AuthLayout />

      <Container>
        <ContentStyle>{children}</ContentStyle>
      </Container>
    </RootStyle>
  );
}
