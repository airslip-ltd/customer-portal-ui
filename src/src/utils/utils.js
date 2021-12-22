const decodeError = (apiError) => {
  const result = [];
  if (!apiError.errors) return result;
  apiError.errors.forEach((error) => {
    result.push({
      errorCode: error.errorCode,
      message: error.message
    });
  });
  return result;
};

export { decodeError };
