import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  zIndex: 9,
  lineHeight: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  padding: theme.spacing(1),
  justifyContent: 'space-between',
  [theme.breakpoints.up('md')]: {
    alignItems: 'flex-start',
    padding: theme.spacing(3, 5, 0, 3)
  }
}));

// ----------------------------------------------------------------------

export default function AuthLayout() {
  return (
    <HeaderStyle>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
    </HeaderStyle>
  );
}
