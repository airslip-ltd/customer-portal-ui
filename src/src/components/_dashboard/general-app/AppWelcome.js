import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent } from '@mui/material';
import { SeoIllustration } from '../../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

AppWelcome.propTypes = {
  displayName: PropTypes.string
};

export default function AppWelcome({ displayName }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: 3,
          color: 'grey.800'
        }}
      >
        <Typography gutterBottom variant="h4">
          Welcome back, {!displayName ? '...' : displayName}!
        </Typography>

        <Typography variant="body2">Here's what you need to know today!</Typography>
      </CardContent>
    </RootStyle>
  );
}
