import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Grid, Button } from '@mui/material';
// layouts
import OnboardingLayout from '../../layouts/OnboardingLayout';
// components
import ProviderSelection from '../../components/integrations/ProviderSelection';
// hooks
import useAuth from '../../hooks/useAuth';
import HelpDialogue from '../../components/_common/HelpDialogue';
// routes
import { PATH_ONBOARDING } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function SetupIntegration() {
  const { memberDetails } = useAuth();
  const [serviceCount, setServiceCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!memberDetails) return;

    const { linkedServices } = memberDetails;
    setServiceCount(linkedServices.length);
  }, [memberDetails, setServiceCount]);

  const handleDoneClicked = () => {
    navigate(PATH_ONBOARDING.complete, { replace: true });
  };

  return (
    <OnboardingLayout
      stageName="Add you integrations"
      title={serviceCount === 0 ? 'Add your first Integration' : 'Add another integration'}
      message={
        serviceCount === 0
          ? 'To make the most of Airslip you should integrate as many of your platforms as possible.'
          : "You're off to a great start, lets see if we support anymore of your providers"
      }
      progress={serviceCount * 25 + 25}
      action={
        serviceCount === 0 ? null : (
          <Button variant="contained" size="medium" onClick={handleDoneClicked}>
            Done for now
          </Button>
        )
      }
    >
      <HelpDialogue title="Good to know">
        We like to make integrating as easy as possible, select your platform of choice from the list below and we'll
        guide you through what you need to do next.
      </HelpDialogue>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProviderSelection />
        </Grid>
      </Grid>
    </OnboardingLayout>
  );
}
