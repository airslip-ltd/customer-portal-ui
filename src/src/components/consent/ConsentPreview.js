import PropTypes from 'prop-types';
import { Grid, Typography } from '@mui/material';

ConsentPreview.propTypes = {
  permissionType: PropTypes.string.isRequired
};

export default function ConsentPreview({ permissionType }) {
  const renderTitle = () => {
    switch (permissionType) {
      case 'Banking':
        return 'Banking Data';
      case 'Commerce':
        return 'Commerce Data';
      case 'Accounting':
        return 'Accounting Data';
      default:
        return 'Invalid type';
    }
  };

  const renderMessage = () => {
    switch (permissionType) {
      case 'Banking':
        return 'You will be sharing bank information such as account details, account transactions, account holder name, your statements and any regular payments.';
      case 'Commerce':
        return 'You will be sharing sales data from your POS or e-commerce system such as order details, inventory and product listings.';
      case 'Accounting':
        return 'You will be sharing information from your accounting system such as accounts, bills, invoices, journals, balance sheet, cashflow and all reports.';
      default:
        return 'Invalid type';
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="subtitle1">{renderTitle()}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {renderMessage()}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
