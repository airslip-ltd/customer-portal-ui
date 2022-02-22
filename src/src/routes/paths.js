// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_LINKING = '/linking';
const ROOTS_INTEGRATE = '/integrate';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
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

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
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
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    newUser: path(ROOTS_DASHBOARD, '/user/new'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account')
  },
  accounts: {
    root: path(ROOTS_DASHBOARD, '/accounts'),
    link: path(ROOTS_DASHBOARD, '/accounts/link'),
    list: path(ROOTS_DASHBOARD, '/accounts/list')
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
  admin: {
    partners: {
      root: path(ROOTS_DASHBOARD, '/admin/partners'),
      list: path(ROOTS_DASHBOARD, '/admin/partners/list'),
      register: path(ROOTS_DASHBOARD, '/admin/partners/register')
    }
  },
  analytics: {
    root: path(ROOTS_DASHBOARD, '/analytics/balances'),
    accountBalances: path(ROOTS_DASHBOARD, '/analytics/balances'),
    commerceSummary: path(ROOTS_DASHBOARD, '/analytics/commerce'),
    debtServiceCoverageRatioDetail: path(ROOTS_DASHBOARD, '/analytics/debt-service-coverage-ratio-detail'),
    revenueBenchmarkingDetail: path(ROOTS_DASHBOARD, '/analytics/revenue-benchmarking-detail'),
    debtRatioDetail: path(ROOTS_DASHBOARD, '/analytics/debt-ratio-detail')
  }
};
