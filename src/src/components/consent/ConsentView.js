import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// material
import { Typography, Box, Link } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import ConsentPreview from './ConsentPreview';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { loadReferral, approveReferral } from '../../redux/slices/register';
// custom
import ApiError from '../_common/Errors/ApiError';
import { FormSection } from '../_common';

// ----------------------------------------------------------------------

export default function ConsentView() {
  const dispatch = useDispatch();
  const { referralId } = useParams();
  const { error, referral, approvalSuccess, isLoading } = useSelector((state) => state.register);
  const navigate = useNavigate();

  useEffect(() => {
    if (!referralId) return;
    dispatch(loadReferral(referralId));
  }, [dispatch, referralId]);

  useEffect(() => {
    if (!approvalSuccess) return;
    navigate('/');
  }, [approvalSuccess, navigate]);

  const handleApprove = () => {
    if (!referralId) return;
    dispatch(approveReferral(referralId));
  };
  const handleDecline = () => {};

  return (
    <>
      <ApiError error={error} />
      {referral && (
        <>
          <FormSection
            title={`Connect to ${referral.partnerName}`}
            message={`${referral.partnerName} would like to view your financial data.`}
          >
            <Typography variant="body2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec iaculis elit urna, eget pellentesque augue
              luctus congue. Maecenas eget ligula id dolor rutrum dictum. Vestibulum magna dolor, elementum sit amet
              justo dapibus, gravida aliquet nisl. Vestibulum iaculis varius massa, in tincidunt metus gravida ut.
            </Typography>
          </FormSection>
          <FormSection title="What this approval means">
            <Typography variant="body2">
              Once approved, {referral.partnerName} will have access to financial data that you have added to your
              Airslip account.
            </Typography>

            {referral.permission &&
              referral.permission.map((row) => {
                const { permissionType } = row;
                return (
                  <Box key={permissionType}>
                    <ConsentPreview permissionType={permissionType} />
                  </Box>
                );
              })}
            <Box sx={{ display: 'flex', bgcolor: 'background.paper', borderRadius: 1 }}>
              <Box>
                <LoadingButton fullWidth size="medium" onClick={handleDecline} variant="outlined" loading={isLoading}>
                  Decline
                </LoadingButton>
              </Box>
              <Box sx={{ flexGrow: 1, ml: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                  <Link underline="always" color="text.primary" href="#">
                    Terms of Service
                  </Link>
                </Typography>
              </Box>
              <Box>
                <LoadingButton fullWidth size="medium" onClick={handleApprove} variant="contained" loading={isLoading}>
                  Approve
                </LoadingButton>
              </Box>
            </Box>
          </FormSection>
        </>
      )}
    </>
  );
}
