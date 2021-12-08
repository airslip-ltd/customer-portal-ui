// material
import { Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

export default function AccountsList() {
  const { themeStretch } = useSettings();

  return (
    <RootStyle title="Accounts | List | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Typography variant="h3" component="h1" paragraph>
          Accounts - List
        </Typography>
      </Container>
    </RootStyle>
  );
}
