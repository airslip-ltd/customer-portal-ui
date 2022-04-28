import React from 'react';
import PropTypes from 'prop-types';
import { NameValueList, NameValueItem } from '../_common';

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
    <NameValueList>
      <NameValueItem name="Description" value={<AccountDescription accountDetail={accountDetail} />} />
      <NameValueItem name="Account Type" value={accountTypeName} />
      <NameValueItem name="Usage Type" value={usageTypeName} />
    </NameValueList>
  );
}
