import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// material
import { Grid, Button, Typography } from '@mui/material';
// layouts
import OnboardingLayout from '../../layouts/OnboardingLayout';
// hooks
import useAuth from '../../hooks/useAuth';
import useMemberDetails from '../../hooks/useMemberDetails';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function SetupComplete() {
  const { memberDetails } = useAuth();
  const { onCompleteSetup } = useMemberDetails();
  const [serviceCount, setServiceCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!memberDetails) return;

    const { linkedServices } = memberDetails;
    setServiceCount(linkedServices.length);
  }, [memberDetails, setServiceCount]);

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
        serviceCount === 0 ? null : (
          <Button variant="contained" size="medium" onClick={handleDoneClicked}>
            Take me home
          </Button>
        )
      }
    >
      <Grid container spacing={3}>
        {memberDetails.linkedServices.map((row) => {
          const { integrationCount, integrationType } = row;

          return (
            <Grid item xs={12} key={integrationType}>
              <Typography variant="body2">
                You added{' '}
                <strong>
                  {integrationCount} {integrationType}
                </strong>{' '}
                integrations
              </Typography>
            </Grid>
          );
        })}
      </Grid>
    </OnboardingLayout>
  );
}
