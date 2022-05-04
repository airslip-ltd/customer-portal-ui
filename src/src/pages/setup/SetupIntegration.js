import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Grid, Button } from '@mui/material';
// layouts
import OnboardingLayout from '../../layouts/OnboardingLayout';
// components
import ProviderSelection from '../../components/integrations/ProviderSelection';
// hooks
import useMemberDetails from '../../hooks/useMemberDetails';
import HelpDialogue from '../../components/_common/HelpDialogue';
// routes
import { PATH_ONBOARDING } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function SetupIntegration() {
  const { memberDetails, refresh } = useMemberDetails();
  const [serviceCount, setServiceCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (!memberDetails) return;
    const { linkedServices } = memberDetails;
    if (!linkedServices) return;
    setServiceCount(linkedServices.length);
  }, [memberDetails, setServiceCount]);

  const handleDoneClicked = () => {
    navigate(PATH_ONBOARDING.complete, { replace: true });
  };

  return (
    <OnboardingLayout
      stageName="Connect your Services"
      title={serviceCount === 0 ? 'Connect your first Service' : 'Connect another Service'}
      message="To make the most of Airslip you should Connect as many of your Services as possible."
      progress={100}
      action={
        serviceCount === 0 ? null : (
          <Button variant="contained" size="medium" onClick={handleDoneClicked}>
            Done for now
          </Button>
        )
      }
    >
      <HelpDialogue title="Good to know" sx={{ mb: 3 }}>
        We like to make Connecting your Services as easy as possible, select your platform of choice from the list below
        and we'll guide you through what you need to do next.
      </HelpDialogue>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ProviderSelection />
        </Grid>
      </Grid>
    </OnboardingLayout>
  );
}
