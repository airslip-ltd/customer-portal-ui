import { useEffect } from 'react';
import { useLocation, useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
// redux
import { Button, Collapse, Stack } from '@mui/material';
import { useDispatch, useSelector } from '../../redux/store';
import { get, requestProvider } from '../../redux/slices/providers';
// components
import Page from '../../components/Page';
import LoadingScreen from '../../components/LoadingScreen';

// ----------------------------------------------------------------------

export default function HubIntegrationAuthorise() {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { request } = useSelector((state) => state.provider);
  const navigate = useNavigate();
  const { provider, integration } = useParams();

  useEffect(() => {
    if (!integration) return;
    if (!provider) return;
    dispatch(get(integration));
    dispatch(requestProvider(provider, integration, search));
  }, [dispatch, navigate, search, provider, integration]);

  useEffect(() => {
    if (request.complete) window.location.href = request.response.authorisationUrl;
  }, [navigate, request]);

  return (
    <Page title="General | App | Airslip">
      <LoadingScreen
        request={request}
        sx={{
          top: 0,
          left: 0,
          width: 1,
          zIndex: 9999,
          position: 'fixed'
        }}
      >
        {request.hasError && (
          <Collapse in={request.hasError}>
            <Stack direction="row" justifyContent="end">
              <Button size="medium" variant="outlined" component={RouterLink} to="/">
                Take me Home
              </Button>
            </Stack>
          </Collapse>
        )}
      </LoadingScreen>
    </Page>
  );
}
