import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Grid, Button, Typography, Stack, Card, Box, CardHeader, CardContent } from '@mui/material';
import ProviderImage from '../../components/integrations/ProviderImage';
import { HelpCard, HelpSection, NameValueItem, NameValueList } from '../../components/_common';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { search as integrationSearch } from '../../redux/slices/integration';
import { GET_ALL_QUERY } from '../../redux/common/search';
// layouts
import OnboardingLayout from '../../layouts/OnboardingLayout';
// hooks
import useSetup from '../../hooks/useSetup';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
import { descriptors } from '../../utils/descriptors';

// ----------------------------------------------------------------------

export default function SetupComplete() {
  const dispatch = useDispatch();
  const { onCompleteSetup } = useSetup();
  const { integration } = useSelector((state) => state.integration);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(integrationSearch(GET_ALL_QUERY));
  }, [dispatch]);

  const handleDoneClicked = () => {
    onCompleteSetup();
    navigate(PATH_DASHBOARD.general.home, { replace: true });
  };

  return (
    <OnboardingLayout
      stageName="Setup complete"
      title="Thats it! Your Done"
      message=""
      progress={100}
      action={
        <Button variant="contained" size="medium" onClick={handleDoneClicked}>
          Take me home
        </Button>
      }
    >
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item md={8}>
          <Card>
            <CardHeader title="Services Linked" />
            <CardContent>
              <Stack spacing={2}>
                {integration.complete &&
                  integration.response.results.map((row) => {
                    const { id, integrationProviderId, provider, name } = row;
                    const { friendlyName, integrationType } = provider;

                    return (
                      <Box key={id} sx={{ display: 'flex' }}>
                        <Box>
                          <ProviderImage
                            provider={integrationProviderId}
                            integrationType={integrationType}
                            fileType="icon"
                          />
                        </Box>
                        <Box sx={{ flexGrow: 1 }}>
                          <Stack sx={{ ml: 2 }} spacing={1}>
                            <Typography variant="subtitle">{friendlyName}</Typography>
                            {integrationType === 'Commerce' && <Typography variant="body2">{name}</Typography>}
                            {integrationType === 'Banking' && (
                              <NameValueList>
                                <NameValueItem
                                  name={descriptors.integrationTitle(row)}
                                  value={descriptors.integration(row)}
                                />
                              </NameValueList>
                            )}
                          </Stack>
                        </Box>
                      </Box>
                    );
                  })}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item sx={{ display: { xs: 'none', md: 'block' } }} md={4}>
          <HelpCard>
            <Stack spacing={4}>
              <HelpSection title="Some Help">
                <Typography variant="body2">Here we will put some help</Typography>
              </HelpSection>
            </Stack>
          </HelpCard>
        </Grid>
      </Grid>
    </OnboardingLayout>
  );
}
