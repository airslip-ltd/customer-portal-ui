import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { OutlinedInput, InputAdornment, IconButton, Card, Typography, CardHeader, Stack } from '@mui/material';
// redux
import { ContentCopy, Check } from '@mui/icons-material';
import { useDispatch, useSelector } from '../../../redux/store';
import { getReferralLink } from '../../../redux/slices/relationship';

// ----------------------------------------------------------------------

RelationshipReferral.propTypes = {
  relationship: PropTypes.object
};

export default function RelationshipReferral({ relationship }) {
  const dispatch = useDispatch();
  const { referral } = useSelector((state) => state.relationship);

  const [clipboard, setClipboard] = useState(false);

  const { id } = relationship;

  useEffect(() => {
    if (id) dispatch(getReferralLink(id));
  }, [dispatch, id]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referral.response.referralLink);
    setClipboard(true);

    setTimeout(() => {
      setClipboard(false);
    }, 3000);
  };

  return (
    <Card>
      <CardHeader title="Referral Details" />

      {referral.complete && (
        <Stack spacing={2} sx={{ p: 3 }}>
          <Stack direction="column" spacing={1}>
            <Typography variant="body2">Referral Link</Typography>
            <OutlinedInput
              id="outlined-adornment-password"
              type="text"
              disabled
              value={referral.response.referralLink}
              size="small"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={copyToClipboard} edge="end">
                    {clipboard ? <Check /> : <ContentCopy />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
          </Stack>
        </Stack>
      )}
    </Card>
  );
}
