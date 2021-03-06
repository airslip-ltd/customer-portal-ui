// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_LINKING = '/linking';
const ROOTS_INTEGRATE = '/integrate';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ONBOARDING = '/onboarding';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  forgot: path(ROOTS_AUTH, '/forgot'),
  create: path(ROOTS_AUTH, '/create'),
  verify: path(ROOTS_AUTH, '/verify')
};

export const PATH_LINKING = {
  root: ROOTS_LINKING
};

export const PATH_INTEGRATE = {
  root: ROOTS_INTEGRATE,
  complete: path(ROOTS_INTEGRATE, '/complete'),
  authorise: path(ROOTS_INTEGRATE, '/authorise')
};

export const PATH_ONBOARDING = {
  root: ROOTS_ONBOARDING,
  complete: path(ROOTS_ONBOARDING, '/complete'),
  integrate: path(ROOTS_ONBOARDING, '/integrate')
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  redirect: {
    settings: path(ROOTS_DASHBOARD, '/redirect/settings')
  },
  general: {
    home: path(ROOTS_DASHBOARD, '/home')
  },
  app: {
    root: path(ROOTS_DASHBOARD, '/app'),
    pageFour: path(ROOTS_DASHBOARD, '/app/four'),
    pageFive: path(ROOTS_DASHBOARD, '/app/five'),
    pageSix: path(ROOTS_DASHBOARD, '/app/six')
  },
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    create: path(ROOTS_DASHBOARD, '/user/create'),
    edit: path(ROOTS_DASHBOARD, `/user/edit`),
    view: path(ROOTS_DASHBOARD, '/user/view')
  },
  profile: {
    root: path(ROOTS_DASHBOARD, '/profile'),
    edit: path(ROOTS_DASHBOARD, `/profile/edit`),
    view: path(ROOTS_DASHBOARD, '/profile/view')
  },
  integrations: {
    root: path(ROOTS_DASHBOARD, '/integrations'),
    list: path(ROOTS_DASHBOARD, '/integrations/list'),
    edit: path(ROOTS_DASHBOARD, `/integrations/edit`),
    view: path(ROOTS_DASHBOARD, '/integrations/view')
  },
  relationship: {
    root: path(ROOTS_DASHBOARD, '/relationship'),
    list: path(ROOTS_DASHBOARD, '/relationship/list'),
    create: path(ROOTS_DASHBOARD, '/relationship/create'),
    edit: path(ROOTS_DASHBOARD, `/relationship/edit`),
    view: path(ROOTS_DASHBOARD, '/relationship/view'),
    summary: path(ROOTS_DASHBOARD, '/relationship/summary')
  },
  consent: {
    root: path(ROOTS_DASHBOARD, '/consent'),
    list: path(ROOTS_DASHBOARD, '/consent/list'),
    view: path(ROOTS_DASHBOARD, '/consent/view')
  },
  reports: {
    root: path(ROOTS_DASHBOARD, '/reporting'),
    list: path(ROOTS_DASHBOARD, '/reporting/list'),
    bankTransactions: path(ROOTS_DASHBOARD, '/reporting/banking-transactions'),
    commerceTransactions: path(ROOTS_DASHBOARD, '/reporting/commerce-transactions')
  },
  partner: {
    root: path(ROOTS_DASHBOARD, '/partners'),
    list: path(ROOTS_DASHBOARD, '/partners/list'),
    create: path(ROOTS_DASHBOARD, '/partners/create'),
    edit: path(ROOTS_DASHBOARD, `/partners/edit`),
    view: path(ROOTS_DASHBOARD, '/partners/view'),
    profile: {
      root: path(ROOTS_DASHBOARD, '/partners/profile'),
      edit: path(ROOTS_DASHBOARD, `/partners/profile/edit`),
      view: path(ROOTS_DASHBOARD, '/partners/profile/view')
    }
  },
  business: {
    root: path(ROOTS_DASHBOARD, '/business'),
    list: path(ROOTS_DASHBOARD, '/business/list'),
    create: path(ROOTS_DASHBOARD, '/business/create'),
    edit: path(ROOTS_DASHBOARD, `/business/edit`),
    view: path(ROOTS_DASHBOARD, '/business/view'),
    profile: {
      root: path(ROOTS_DASHBOARD, '/business/profile'),
      edit: path(ROOTS_DASHBOARD, `/business/profile/edit`),
      view: path(ROOTS_DASHBOARD, '/business/profile/view')
    }
  },
  apiKey: {
    root: path(ROOTS_DASHBOARD, '/apikey'),
    list: path(ROOTS_DASHBOARD, '/apikey/list'),
    create: path(ROOTS_DASHBOARD, '/apikey/create'),
    view: path(ROOTS_DASHBOARD, '/apikey/view')
  },
  analytics: {
    root: path(ROOTS_DASHBOARD, '/analytics/balances'),
    accountBalances: path(ROOTS_DASHBOARD, '/analytics/balances'),
    commerceSummary: path(ROOTS_DASHBOARD, '/analytics/commerce'),
    bankingRecentTransactions: path(ROOTS_DASHBOARD, '/analytics/banking-recent-transactions'),
    debtServiceCoverageRatioDetail: path(ROOTS_DASHBOARD, '/analytics/debt-service-coverage-ratio-detail'),
    customersDetail: path(ROOTS_DASHBOARD, '/analytics/customers-detail'),
    revenueBenchmarkingDetail: path(ROOTS_DASHBOARD, '/analytics/revenue-benchmarking-detail'),
    debtRatioDetail: path(ROOTS_DASHBOARD, '/analytics/debt-ratio-detail'),
    debtToCapitalRatioDetail: path(ROOTS_DASHBOARD, '/analytics/debt-to-capital-ratio-detail')
  }
};
