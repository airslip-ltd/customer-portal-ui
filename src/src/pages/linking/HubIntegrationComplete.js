import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// material
import { Container, Grid } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviders, authoriseProvider } from '../../redux/slices/providers';
// components
import Page from '../../components/Page';
import { AppWelcome } from '../../components/_dashboard/general-app';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function HubIntegrationComplete() {
  const { themeStretch } = useSettings();
  const { user } = useAuth();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { authoriseSuccess } = useSelector((state) => state.provider);
  const navigate = useNavigate();
  const { provider, integration } = useParams();

  useEffect(() => {
    if (!integration) return;
    if (!provider) return;
    dispatch(getProviders());
    dispatch(authoriseProvider(provider, integration, search));
  }, [dispatch, search, provider, integration]);

  useEffect(() => {
    if (authoriseSuccess) {
      setTimeout(() => {
        navigate(PATH_DASHBOARD.general.home, { replace: true });
      }, 2000);
    }
  }, [navigate, authoriseSuccess]);

  return (
    <Page title="General | App | Airslip">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3} sx={{ p: 3 }}>
          <Grid item xs={12}>
            <AppWelcome displayName={user.displayName} />
          </Grid>
          {!authoriseSuccess && <>Processing consent...</>}
          {authoriseSuccess && <>Complete!</>}
        </Grid>
      </Container>
    </Page>
  );
}
