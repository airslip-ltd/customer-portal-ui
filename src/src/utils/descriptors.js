const descriptors = {
  integration: (integration) => {
    if (integration.provider.integrationType === 'Banking') {
      const { accountDetail } = integration;
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

    return integration.name;
  },
  integrationTitle: (integration) => {
    if (integration.provider.integrationType === 'Banking') {
      const { accountDetail } = integration;
      console.log(accountDetail);

      if (accountDetail.accountType === 'CREDIT_CARD') {
        return 'Credit Card';
      }
      if (accountDetail.sortCode) {
        return 'Current Account';
      }
      if (!accountDetail.lastCardDigits) {
        return 'Currency';
      }

      return 'Credit Card';
    }

    return integration.name;
  },
  bankingType: (integration) => {
    const { accountDetail } = integration;
    if (accountDetail.accountType === 'CREDIT_CARD') {
      return 'CC';
    }
    if (accountDetail.sortCode) {
      return 'CA';
    }
    if (!accountDetail.lastCardDigits) {
      return 'CU';
    }

    return 'CC';
  },
  bankingAccountType: (accountDetail) => {
    switch (accountDetail.accountType) {
      case 'CURRENT':
        return 'Current Account';
      case 'CREDIT_CARD':
        return 'Credit Card';
      default:
        return accountDetail.accountType;
    }
  },
  bankingUsageType: (accountDetail) => {
    switch (accountDetail.usageType) {
      case 'PERSONAL':
        return 'Personal';
      case 'BUSINESS':
        return 'Business';
      default:
        return accountDetail.usageType;
    }
  }
};

export { descriptors };
