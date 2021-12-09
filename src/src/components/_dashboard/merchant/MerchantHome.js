import { useEffect } from 'react';
// material
import { Grid } from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
// redux
import { useDispatch, useSelector } from '../../../redux/store';
import { getMerchantList } from '../../../redux/slices/merchant';
// components
import { MerchantSummary } from '../merchant-view';

// ----------------------------------------------------------------------

export default function MerchantHome() {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { merchantList } = useSelector((state) => state.merchant);
  const currentMerchant = merchantList.find((merchant) => merchant.id === user.entityId);

  useEffect(() => {
    dispatch(getMerchantList());
  }, [dispatch]);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <MerchantSummary currentMerchant={currentMerchant} />
      </Grid>
    </Grid>
  );
}
