import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviderList, requestProvider } from '../../redux/slices/providers';
// components
import Page from '../../components/Page';
import LoadingScreen from '../../components/LoadingScreen';

// ----------------------------------------------------------------------

export default function HubIntegrationAuthorise() {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { authUrl } = useSelector((state) => state.provider);
  const navigate = useNavigate();
  const { provider, integration } = useParams();

  useEffect(() => {
    if (!integration) return;
    if (!provider) return;
    dispatch(getProviderList());
    dispatch(requestProvider(provider, integration, search));
  }, [dispatch, search, provider, integration]);

  useEffect(() => {
    if (authUrl) {
      setTimeout(() => {
        window.location.href = authUrl;
      }, 2000);
    }
  }, [navigate, authUrl]);

  return (
    <Page title="General | App | Airslip">
      <LoadingScreen
        sx={{
          top: 0,
          left: 0,
          width: 1,
          zIndex: 9999,
          position: 'fixed'
        }}
      />
    </Page>
  );
}
