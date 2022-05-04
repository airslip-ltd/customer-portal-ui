import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
// material
import { Typography, Box, Link, Stack } from '@mui/material';
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
            sx={{ pb: 2 }}
          />
          <FormSection
            title="What this approval means"
            message={`Once approved, ${referral.partnerName} will have access to financial data that you have added to your
          Airslip account.`}
            sx={{ pb: 4 }}
          >
            <Stack spacing={2}>
              {referral.permission &&
                referral.permission.map((row) => {
                  const { permissionType } = row;
                  return (
                    <Box key={permissionType}>
                      <ConsentPreview permissionType={permissionType} />
                    </Box>
                  );
                })}
            </Stack>
          </FormSection>

          <Box sx={{ display: 'flex' }}>
            <Box>
              <LoadingButton size="medium" onClick={handleDecline} variant="outlined" loading={isLoading}>
                Decline
              </LoadingButton>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                <Link
                  underline="always"
                  color="text.primary"
                  target="_blank"
                  rel="noopener"
                  href="https://www.airslip.com/terms"
                >
                  Terms of Service
                </Link>
              </Typography>
            </Box>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <LoadingButton size="medium" onClick={handleApprove} variant="contained" loading={isLoading}>
                Approve
              </LoadingButton>
            </Box>
          </Box>
        </>
      )}
    </>
  );
}
