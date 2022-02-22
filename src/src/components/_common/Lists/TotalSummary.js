import PropTypes from 'prop-types';
// material
import { Card, Grid, Typography } from '@mui/material';
import { Fragment } from 'react';
import { fCurrencyFromLong } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

TotalSummary.propTypes = {
  totals: PropTypes.array.isRequired
};

export default function TotalSummary({ totals }) {
  return (
    <>
      <Card sx={{ p: 3 }}>
        <Grid container>
          <Grid item xs={12}>
            <Typography variant="h4">Totals</Typography>
          </Grid>
          {totals.map((total) => (
            <Fragment key={total.id}>
              <Grid item xs={6}>
                <Typography variant="subtitle2">{total.title}</Typography>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle2">{fCurrencyFromLong(total.amount)}</Typography>
              </Grid>
            </Fragment>
          ))}
        </Grid>
      </Card>
    </>
  );
}