export function featureEnabled(featureName) {
  // Demo only features here...
  switch (featureName) {
    case 'banking-recent-transactions':
    case 'accounting-integrations':
    case 'industry-exposure':
      return process.env.REACT_APP_ENVIRONMENT === 'demo';
    case 'demo':
      return process.env.REACT_APP_ENVIRONMENT === 'demo';
    case 'partner-risk-focus':
    case 'demo-to-complete':
      return false;
    case 'coming-soon':
      return process.env.REACT_APP_ENVIRONMENT !== 'demo';
    default:
      return true;
  }
}
