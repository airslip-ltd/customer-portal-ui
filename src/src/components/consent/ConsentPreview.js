import PropTypes from 'prop-types';
import { Grid, Stack, Typography } from '@mui/material';
import approved from '@iconify/icons-ic/baseline-check-circle-outline';
import { NameValueItem, NameValueList } from '../_common';

ConsentPreview.propTypes = {
  permissionType: PropTypes.string.isRequired
};

export default function ConsentPreview({ permissionType }) {
  const renderScopes = () => {
    switch (permissionType) {
      case 'Banking':
        return [
          'Account details',
          'Account transactions',
          'Account holder name',
          'Bank statements',
          'Regular payments'
        ];
      case 'Commerce':
        return ['Order details', 'Inventory', 'Product listings'];
      case 'Accounting':
        return ['Accounts', 'Bills', 'Invoices', 'Journals', 'Balance sheet', 'Cashflow'];
      default:
        return [];
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={4}>
          <Typography variant="subtitle1">{`${permissionType} data`}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Stack spacing={1}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You will be sharing the following {permissionType} data:
            </Typography>
            <NameValueList>
              {approved && renderScopes().map((item) => <NameValueItem key={item} icon={approved} name={item} />)}
            </NameValueList>
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
