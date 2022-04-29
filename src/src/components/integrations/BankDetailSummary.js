import React from 'react';
import PropTypes from 'prop-types';
import { NameValueList, NameValueItem } from '../_common';
// utils
import { descriptors } from '../../utils/descriptors';

// ----------------------------------------------------------------------

BankDetailSummary.propTypes = {
  providerDetail: PropTypes.object.isRequired
};

export default function BankDetailSummary({ providerDetail }) {
  return (
    <NameValueList>
      {descriptors.bankingType(providerDetail) === 'CC' && (
        <NameValueItem name="Masked Pan" value={descriptors.integration(providerDetail)} />
      )}
      {descriptors.bankingType(providerDetail) === 'CA' && (
        <NameValueItem name="Account No" value={providerDetail.accountDetail.accountNumber} />
      )}
      {descriptors.bankingType(providerDetail) === 'CA' && (
        <NameValueItem name="Sort Code" value={providerDetail.accountDetail.sortCode} />
      )}
      {descriptors.bankingType(providerDetail) === 'CU' && (
        <NameValueItem name="Currency" value={providerDetail.accountDetail.currencyCode} />
      )}
      <NameValueItem name="Account Type" value={descriptors.bankingAccountType(providerDetail.accountDetail)} />
      <NameValueItem name="Usage Type" value={descriptors.bankingUsageType(providerDetail.accountDetail)} />
    </NameValueList>
  );
}
