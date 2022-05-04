import { useEffect } from 'react';
// material
import { Box } from '@mui/material';
// hooks
import useMemberDetails from '../../hooks/useMemberDetails';
// components
import { ConnectHeader, FixedAvatar } from '../../components/_common';
import ConsentView from '../../components/consent/ConsentView';
import ExternalFixedLayout from '../../layouts/ExternalFixedLayout';
// redux
import { useSelector } from '../../redux/store';

// ----------------------------------------------------------------------

export default function ConsentReview() {
  const { memberDetails, refresh } = useMemberDetails();
  const { referral } = useSelector((state) => state.register);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <ExternalFixedLayout
      title="Connecting your Service"
      size="small"
      header={
        referral &&
        memberDetails.memberName && (
          <Box sx={{ display: 'flex', mb: 2 }}>
            <Box sx={{ flexGrow: 1 }} />
            <Box>
              <ConnectHeader
                left={<FixedAvatar name={referral.partnerName} height={50} width={50} />}
                right={<FixedAvatar name={memberDetails.memberName} height={50} width={50} />}
              />
            </Box>
            <Box sx={{ flexGrow: 1 }} />
          </Box>
        )
      }
    >
      <ConsentView />
    </ExternalFixedLayout>
  );
}
