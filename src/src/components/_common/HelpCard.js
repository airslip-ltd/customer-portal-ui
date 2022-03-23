import PropTypes from 'prop-types';
// material
import { styled } from '@mui/material/styles';
import { Typography, Card, CardContent, Stack } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  backgroundColor: theme.palette.primary.lighter,
  [theme.breakpoints.up('md')]: {
    height: '100%',
    display: 'flex',
    textAlign: 'left',
    justifyContent: 'space-between'
  }
}));

// ----------------------------------------------------------------------

HelpCard.propTypes = {
  children: PropTypes.node.isRequired
};

export default function HelpCard({ children }) {
  return (
    <RootStyle>
      <CardContent
        sx={{
          p: 3,
          color: 'grey.800'
        }}
      >
        <Stack spacing={2}>
          <Typography variant="h4">Help</Typography>
          <>{children}</>
        </Stack>
      </CardContent>
    </RootStyle>
  );
}
