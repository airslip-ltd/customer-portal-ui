import React from 'react';
import PropTypes from 'prop-types';
import { Stack } from '@mui/material';
import { NameValueDisplay } from '.';

// ----------------------------------------------------------------------

AccountDescription.propTypes = {
  accountDetail: PropTypes.object.isRequired
};

function AccountDescription({ accountDetail }) {
  if (accountDetail.accountType === 'CREDIT_CARD') {
    return `**** **** **** ${accountDetail.lastCardDigits}`;
  }
  if (accountDetail.sortCode) {
    return `Acc: ${accountDetail.accountNumber}, S/C: ${accountDetail.sortCode}`;
  }
  if (!accountDetail.lastCardDigits) {
    return `Currency ${accountDetail.currencyCode}`;
  }

  return `**** **** **** ${accountDetail.lastCardDigits}`;
}

// ----------------------------------------------------------------------

BankDetailSummary.propTypes = {
  accountDetail: PropTypes.object.isRequired
};

export default function BankDetailSummary({ accountDetail }) {
  let accountTypeName = '';
  let usageTypeName = '';

  switch (accountDetail.accountType) {
    case 'CURRENT':
      accountTypeName = 'Current Account';
      break;
    case 'CREDIT_CARD':
      accountTypeName = 'Credit Card';
      break;
    default:
      accountTypeName = accountDetail.accountType;
  }

  switch (accountDetail.usageType) {
    case 'PERSONAL':
      usageTypeName = 'Personal';
      break;
    case 'BUSINESS':
      usageTypeName = 'Business';
      break;
    default:
      usageTypeName = accountDetail.usageType;
  }

  return (
    <Stack>
      <NameValueDisplay name="Description" value={<AccountDescription accountDetail={accountDetail} />} />
      <NameValueDisplay name="Account Type" value={accountTypeName} />
      <NameValueDisplay name="Usage Type" value={usageTypeName} />
    </Stack>
  );
}
