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
  }
};

export { descriptors };
