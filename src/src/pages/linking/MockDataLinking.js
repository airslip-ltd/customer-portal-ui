import { useNavigate } from 'react-router-dom';
// material
import { Button } from '@mui/material';
// layouts
import OnboardingLayout from '../../layouts/OnboardingLayout';
// routes
import { PATH_INTEGRATE } from '../../routes/paths';

// ----------------------------------------------------------------------

export default function MockDataLinking() {
  const navigate = useNavigate();
  const handleDoneClicked = () => {
    navigate(`${PATH_INTEGRATE.complete}/mockdata/airslip-bank`, { replace: true });
  };

  return (
    <OnboardingLayout
      stageName="Link this bank"
      title="Let's link Airslip Bank"
      message=""
      progress={100}
      action={
        <Button variant="contained" size="medium" onClick={handleDoneClicked}>
          Link now
        </Button>
      }
    />
  );
}
