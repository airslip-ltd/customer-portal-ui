import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link as RouterLink, useSearchParams } from 'react-router-dom';
import PropTypes from 'prop-types';
// material
import { Grid, Typography, Box, Button, Collapse, Stack } from '@mui/material';
// layouts
import { ApiErrorFriendly } from '../../components/_common/Errors';
import ExternalFixedLayout from '../../layouts/ExternalFixedLayout';
// components
import ExternalHeader from '../../components/_common/ExternalHeader';
import { ProviderImage } from '../../components/integrations';
import { LoadingProgress, LoadingComplete, LoadingFailed } from '../../components/_common/progress';
import { HelpDialogue, SuccessDialogue } from '../../components/_common';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getProviders, authoriseProvider } from '../../redux/slices/providers';
import { search as integrationSearch } from '../../redux/slices/integration';
// hooks
import useAuth from '../../hooks/useAuth';
import useMemberDetails from '../../hooks/useMemberDetails';
// routes
import { PATH_INTEGRATE, PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

Item.propTypes = {
  sx: PropTypes.object
};

function Item(props) {
  const { sx, ...other } = props;
  return <Box sx={{ p: 1, m: 1, ...sx }} {...other} />;
}

// ----------------------------------------------------------------------

export default function HubIntegrationComplete() {
  const { isAuthenticated } = useAuth();
  const { refresh } = useMemberDetails();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { authorise, providers } = useSelector((state) => state.provider);
  const { integration: integrations } = useSelector((state) => state.integration);
  const navigate = useNavigate();
  const { provider, integration } = useParams();
  const [searchParams] = useSearchParams();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [linkVerified, setLinkVerified] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Get se;ected shop name
  const shop = searchParams.get('shop');

  useEffect(() => {
    if (!integration) return;
    if (!provider) return;
    dispatch(getProviders());
    dispatch(authoriseProvider(provider, integration, search));
  }, [dispatch, search, provider, integration]);

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
    if (!providers || providers.response.results.length === 0) return;
    if (!integration) return;

    const thisProvider = providers.response.results.filter((row) => row.id === integration);

    if (thisProvider.length > 0) setSelectedProvider(thisProvider[0]);
  }, [providers, integration, setSelectedProvider]);

  return (
    <ExternalFixedLayout
      title="Connecting your Service"
      message="To make the most of Airslip you should Connect as many of your Services as possible."
    >
      <ExternalHeader title="Completing Connection" progress={0} />

      <HelpDialogue title="Good to know">
        We're doing a little work now to Connect to your Service, once this is complete we'll start analysing your data
        automatically!
      </HelpDialogue>

      {selectedProvider && (
        <Grid container spacing={1} sx={{ mt: 5 }}>
          <Grid item xs={12} sx={{ mb: 3 }}>
            <Stack spacing={3}>
              <Typography variant="subtitle1">Connecting to {selectedProvider.friendlyName}</Typography>
            </Stack>
          </Grid>
          <Grid item xs={12} sx={{ minHeight: 60 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Item sx={{ flexGrow: 1 }}>
                <ProviderImage
                  provider={selectedProvider.id}
                  integrationType={selectedProvider.integrationType}
                  fileType="logo"
                />
              </Item>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ minHeight: 60 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Item sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <Typography variant="h6">Connecting to Service</Typography>
                  <ApiErrorFriendly
                    error={authorise.error}
                    message={`Something went wrong registering ${selectedProvider.friendlyName}...`}
                  />
                </Stack>
              </Item>
              <Item>
                {authorise.loading && <LoadingProgress />}
                {authorise.complete && <LoadingComplete />}
                {authorise.hasError && <LoadingFailed />}
              </Item>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ minHeight: 60 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
              <Item sx={{ flexGrow: 1 }}>
                <Typography variant="h6">Verifying Connection</Typography>
              </Item>
              <Item>
                {!linkVerified && !authorise.hasError && <LoadingProgress />}
                {linkVerified && <LoadingComplete />}
                {authorise.hasError && <LoadingFailed />}
              </Item>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ minHeight: 60 }}>
            <Collapse in={authorise.complete && linkVerified}>
              <SuccessDialogue title="And you're done">
                <Typography variant="body2">
                  Thats it, you've successfully Connected with {selectedProvider.friendlyName}. We'll do the rest, so
                  sit back and have a cup of tea.
                </Typography>
              </SuccessDialogue>

              <Stack spacing={1} direction="row" justifyContent="end">
                <Button
                  size="medium"
                  variant="contained"
                  component={RouterLink}
                  to={PATH_DASHBOARD.integrations.create}
                >
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
                  <Button
                    size="medium"
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.integrations.create}
                  >
                    Back
                  </Button>
                )}
              </Stack>
            </Collapse>
          </Grid>
        </Grid>
      )}
      <Grid container spacing={3}>
        <Grid item xs={12} />
      </Grid>
    </ExternalFixedLayout>
  );
}
