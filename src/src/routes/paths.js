// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
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
  partner: {
    merchants: {
      root: path(ROOTS_DASHBOARD, '/merchants'),
      list: path(ROOTS_DASHBOARD, '/merchants/list'),
      link: path(ROOTS_DASHBOARD, '/merchants/link')
    }
  }
};
