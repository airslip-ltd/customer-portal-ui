import { isUndefined } from 'lodash-es';
import PropTypes from 'prop-types';
// material
import { Grid, Stack, Container } from '@mui/material';
// components
import {
  MerchantRevenue,
  MerchantRefunds,
  MerchantInterestCharges,
  MerchantPaymentMethods,
  MerchantSalesAndRefunds,
  MerchantRecentTransactions,
  MerchantTitle,
  MerchantRiskScore
} from '.';

// ----------------------------------------------------------------------

MerchantSummary.propTypes = {
  currentMerchant: PropTypes.object
};

export default function MerchantSummary({ currentMerchant }) {
  return (
    <Container>
      {!isUndefined(currentMerchant) && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MerchantTitle displayName={currentMerchant.name} />
          </Grid>

          <Grid item xs={12} md={4}>
            <MerchantRevenue />
          </Grid>

          <Grid item xs={12} md={4}>
            <MerchantRefunds />
          </Grid>

          <Grid item xs={12} md={4}>
            <MerchantInterestCharges />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <Stack spacing={3}>
              <MerchantRiskScore rating={currentMerchant.rating} />
              <MerchantPaymentMethods />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <MerchantSalesAndRefunds />
          </Grid>

          <Grid item xs={12}>
            <MerchantRecentTransactions />
          </Grid>
        </Grid>
      )}
    </Container>
  );
}
