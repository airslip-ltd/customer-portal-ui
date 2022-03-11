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
    link: path(ROOTS_DASHBOARD, '/integrations/link'),
    list: path(ROOTS_DASHBOARD, '/integrations/list')
  },
  relationship: {
    root: path(ROOTS_DASHBOARD, '/relationship'),
    list: path(ROOTS_DASHBOARD, '/relationship/list'),
    create: path(ROOTS_DASHBOARD, '/relationship/create')
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
  analytics: {
    root: path(ROOTS_DASHBOARD, '/analytics/balances'),
    accountBalances: path(ROOTS_DASHBOARD, '/analytics/balances'),
    commerceSummary: path(ROOTS_DASHBOARD, '/analytics/commerce'),
    bankingRecentTransactions: path(ROOTS_DASHBOARD, '/analytics/banking-recent-transactions'),
    debtServiceCoverageRatioDetail: path(ROOTS_DASHBOARD, '/analytics/debt-service-coverage-ratio-detail'),
    revenueBenchmarkingDetail: path(ROOTS_DASHBOARD, '/analytics/revenue-benchmarking-detail'),
    debtRatioDetail: path(ROOTS_DASHBOARD, '/analytics/debt-ratio-detail'),
    debtToCapitalRatioDetail: path(ROOTS_DASHBOARD, '/analytics/debt-to-capital-ratio-detail')
  }
};
