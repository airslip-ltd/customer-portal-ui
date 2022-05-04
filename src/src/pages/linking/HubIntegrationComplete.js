import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link as RouterLink, useSearchParams } from 'react-router-dom';
// material
import { Typography, Box, Button, Collapse, Stack } from '@mui/material';
// layouts
import { ApiErrorFriendly } from '../../components/_common/Errors';
import ExternalFixedLayout from '../../layouts/ExternalFixedLayout';
// components
import { ProviderImage } from '../../components/integrations';
import { LoadingProgress, LoadingComplete, LoadingFailed } from '../../components/_common/progress';
import { FixedAvatar, HelpDialogue, SuccessDialogue, ConnectHeader } from '../../components/_common';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { get, authoriseProvider } from '../../redux/slices/providers';
import { search as integrationSearch } from '../../redux/slices/integration';
// hooks
import useAuth from '../../hooks/useAuth';
import useMemberDetails from '../../hooks/useMemberDetails';
// routes
import { PATH_INTEGRATE, PATH_ONBOARDING } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function HubIntegrationComplete() {
  const { isAuthenticated } = useAuth();
  const { refresh, memberDetails } = useMemberDetails();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { authorise, current } = useSelector((state) => state.provider);
  const { integration: integrations } = useSelector((state) => state.integration);
  const navigate = useNavigate();
  const { provider, integration } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [linkVerified, setLinkVerified] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Get selected shop name
  const shop = searchParams.get('shop');

  useEffect(() => {
    if (!integration) return;
    if (!provider) return;

    dispatch(get(integration));
    dispatch(authoriseProvider(provider, integration, search));
  }, [dispatch, search, provider, integration]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (authorise.complete) {
      const query = {
        page: 0,
        recordsPerPage: 1,
        sort: [{ field: 'id', sort: 'desc' }],
        search: {
          items: [{ columnField: 'integrationProviderId', value: integration, operatorValue: 'equals' }],
          linkOperator: 'and'
        }
      };

      setIntervalId(setInterval(() => dispatch(integrationSearch(query)), 2000));
    }
  }, [dispatch, authorise, integration]);

  useEffect(() => {
    if (!integrations.complete) return;
    if (integrations.response.paging.totalRecords > 0) {
      clearInterval(intervalId);
      setLinkVerified(true);
    }
  }, [integrations, intervalId, navigate, refresh]);

  useEffect(() => {
    if (!current.complete) return;
    setSelectedProvider(current.response.currentVersion);
  }, [current, setSelectedProvider]);

  return (
    <ExternalFixedLayout
      title="Connecting your Service"
      size="small"
      header={
        selectedProvider && (
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <ConnectHeader
                left={
                  <ProviderImage
                    provider={selectedProvider.id}
                    integrationType={selectedProvider.integrationType}
                    height={50}
                    width={50}
                    fileType="icon"
                  />
                }
                right={<FixedAvatar name={memberDetails.memberName} height={50} width={50} />}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
        )
      }
    >
      {selectedProvider && (
        <>
          <Stack spacing={2}>
            <Typography variant="body2">
              We're currently establishing a connection to {selectedProvider.friendlyName}, it shouldn't take too long
              so please sit tight.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <Typography variant="h6">Connecting to {selectedProvider.friendlyName}</Typography>
                  <ApiErrorFriendly
                    error={authorise.error}
                    message={`Something went wrong registering ${selectedProvider.friendlyName}...`}
                  />
                </Stack>
              </Box>
              <Box>
                {authorise.loading && <LoadingProgress />}
                {authorise.complete && <LoadingComplete />}
                {authorise.hasError && <LoadingFailed />}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Verifying Connection</Typography>
              </Box>
              <Box>
                {!linkVerified && !authorise.hasError && <LoadingProgress />}
                {linkVerified && <LoadingComplete />}
                {authorise.hasError && <LoadingFailed />}
              </Box>
            </Box>

            <Box>
              <Collapse in={!authorise.complete && !authorise.hasError}>
                <HelpDialogue title="Good to know">
                  We're doing a little work now to Connect to your Service, once this is complete we'll start analysing
                  your data automatically!
                </HelpDialogue>
              </Collapse>

              <Collapse in={authorise.complete && linkVerified}>
                <SuccessDialogue title="And you're done">
                  <Typography variant="body2">
                    Thats it, you've successfully Connected with {selectedProvider.friendlyName}. We'll do the rest, so
                    sit back and have a cup of tea.
                  </Typography>
                </SuccessDialogue>

                <Stack spacing={1} direction="row" justifyContent="end">
                  <Button size="medium" variant="contained" component={RouterLink} to={PATH_ONBOARDING.integrate}>
                    Continue
                  </Button>
                </Stack>
              </Collapse>

              <Collapse in={authorise.hasError}>
                <Stack spacing={1} direction="row" justifyContent="end">
                  <Button
                    size="medium"
                    variant="outlined"
                    component={RouterLink}
                    to={`${PATH_INTEGRATE.authorise}/${selectedProvider.provider}/${selectedProvider.integration}${
                      shop ? `?shop=${shop}` : ''
                    }`}
                  >
                    Try Again
                  </Button>
                  {isAuthenticated && (
                    <Button size="medium" variant="contained" component={RouterLink} to={PATH_ONBOARDING.integrate}>
                      Back
                    </Button>
                  )}
                </Stack>
              </Collapse>
            </Box>
          </Stack>
        </>
      )}
    </ExternalFixedLayout>
  );
}
