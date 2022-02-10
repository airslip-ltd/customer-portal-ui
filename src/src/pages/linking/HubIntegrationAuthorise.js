import { useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviderList, requestProvider, validateInitiation } from '../../redux/slices/providers';
// components
import Page from '../../components/Page';
import LoadingScreen from '../../components/LoadingScreen';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function HubIntegrationAuthorise() {
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { authUrl, validation } = useSelector((state) => state.provider);
  const navigate = useNavigate();
  const { provider, integration } = useParams();

  useEffect(() => {
    if (!integration) return;
    if (!provider) return;

    if (!search) navigate(PATH_DASHBOARD.root);

    dispatch(getProviderList());
    dispatch(validateInitiation(provider, integration, search));
  }, [dispatch, navigate, search, provider, integration]);

  useEffect(() => {
    if (authUrl) {
      setTimeout(() => {
        console.log(authUrl);
        window.location.href = authUrl;
      }, 2000);
    }
  }, [navigate, authUrl]);

  useEffect(() => {
    switch (validation) {
      case 'valid':
        dispatch(requestProvider(provider, integration, search));
        break;
      case 'invalid':
        navigate('/401');
        break;
      default:
        break;
    }
  }, [navigate, dispatch, validation, search, provider, integration]);

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
