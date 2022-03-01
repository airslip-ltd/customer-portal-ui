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

export { decodeError };
