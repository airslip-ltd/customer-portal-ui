import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, Link as RouterLink } from 'react-router-dom';
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
// routes
import { PATH_DASHBOARD, PATH_INTEGRATE } from '../../routes/paths';

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
  const { refreshMemberDetails, isAuthenticated } = useAuth();
  const { search } = useLocation();
  const dispatch = useDispatch();
  const { authorise, providers } = useSelector((state) => state.provider);
  const { integration: integrations } = useSelector((state) => state.integration);
  const navigate = useNavigate();
  const { provider, integration, shop } = useParams();
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [linkVerified, setLinkVerified] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [timeoutId, setTimeoutId] = useState(null);

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

  const handleNavigate = useCallback(() => {
    clearTimeout(timeoutId);
    navigate(PATH_DASHBOARD.general.home, { replace: true });
  }, [navigate, timeoutId]);

  useEffect(() => {
    if (!integrations.hasData) return;
    if (integrations.response.paging.totalRecords > 0) {
      clearInterval(intervalId);
      setLinkVerified(true);
      refreshMemberDetails();
      setTimeoutId(
        setTimeout(() => {
          navigate(PATH_DASHBOARD.general.home, { replace: true });
        }, 6000)
      );
    }
  }, [integrations, intervalId, navigate, refreshMemberDetails]);

  useEffect(() => {
    if (!providers || providers.response.results.length === 0) return;
    if (!integration) return;

    const thisProvider = providers.response.results.filter((row) => row.id === integration);

    if (thisProvider.length > 0) setSelectedProvider(thisProvider[0]);
  }, [providers, integration, setSelectedProvider]);

  return (
    <ExternalFixedLayout
      title="Add an Integration"
      message="To make the most of Airslip you should integrate as many of your platforms as possible."
    >
      <ExternalHeader title="Completing Integration" progress={0} />

      <HelpDialogue title="Good to know">
        We're doing a little work now to integrate your provider, once this is complete we'll start analysing your data
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
                  icon={selectedProvider.id}
                  integrationType={selectedProvider.integrationType}
                  imageType="svg"
                />
              </Item>
            </Box>
          </Grid>

          <Grid item xs={12} sx={{ minHeight: 60 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Item sx={{ flexGrow: 1 }}>
                <Stack spacing={1}>
                  <Typography variant="h6">Registering integration</Typography>
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
                <Typography variant="h6">Verifying integration</Typography>
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
              <SuccessDialogue
                title="And you're done"
                action={
                  <Button color="inherit" size="small" onClick={handleNavigate}>
                    Done
                  </Button>
                }
              >
                <Typography variant="body2">
                  Thats it, you've successfully integrated with {selectedProvider.friendlyName}. We'll do the rest, so
                  sit back and have a cup of tea.
                </Typography>
                <Typography variant="body2">
                  You'll automatically be sent you where you need to go next, but if that doesn't happen you can select
                  the Done button.
                </Typography>
              </SuccessDialogue>
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
                  <Button size="medium" variant="contained" component={RouterLink} to="/">
                    Take me Home
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
