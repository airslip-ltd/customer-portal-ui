export function featureEnabled(featureName) {
  // Demo only features here...
  if (process.env.REACT_APP_ENVIRONMENT !== 'demo') {
    switch (featureName) {
      case 'banking-recent-transactions':
        return false;
      case 'demo':
        return false;
      default:
        return true;
    }
  }

  switch (featureName) {
    case 'demo-to-complete':
      return false;
    default:
      return true;
  }
}
