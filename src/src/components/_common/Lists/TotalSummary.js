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
          <Fragment key={totals[0].id}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">{totals[0].title}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle2">{fCurrencyFromLong(totals[0].amount)}</Typography>
            </Grid>
          </Fragment>
          <Fragment key={totals[1].id}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">{totals[1].title}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle2">{fCurrencyFromLong(totals[1].amount)}</Typography>
            </Grid>
          </Fragment>
          <Fragment key={totals[2].id}>
            <Grid item xs={6}>
              <Typography variant="subtitle2">{totals[2].title}</Typography>
            </Grid>
            <Grid item xs={6} sx={{ textAlign: 'right' }}>
              <Typography variant="subtitle2">{totals[2].amount}</Typography>
            </Grid>
          </Fragment>
        </Grid>
      </Card>
    </>
  );
}
