const decodeError = (apiError) => {
  const result = [];
  if (apiError.errors) {
    apiError.errors.forEach((error) => {
      result.push({
        errorCode: error.errorCode,
        message: error.message
      });
    });
  }

  if (apiError.errorCode) {
    result.push({
      errorCode: apiError.errorCode,
      message: apiError.message
    });
  }
  return result;
};

const formatError = (errorDetails) => errorDetails.message;

const reduceProviders = (providers) => {
  const distinctProviders = providers.reduce((acc, curr) => {
    const hasItem = acc.find(
      (row) =>
        row.friendlyName === curr.friendlyName &&
        row.integrationType === curr.integrationType &&
        row.provider === curr.provider
    );

    if (hasItem) {
      hasItem.children.push(curr);
      hasItem.installationCount += curr.installationCount;
    } else {
      acc.push({
        friendlyName: curr.friendlyName,
        id: curr.id,
        provider: curr.provider,
        integrationType: curr.integrationType,
        children: [curr],
        installationCount: curr.installationCount,
        availability: curr.availability
      });
    }

    return acc;
  }, []);

  return distinctProviders;
};

export { decodeError, reduceProviders, formatError };
