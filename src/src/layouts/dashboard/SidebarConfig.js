// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  booking: getIcon('ic_booking'),
  settings: getIcon('ic_settings')
};

const sidebarConfig = [
  // GENERAL - Merchant
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    userTypes: ['Merchant'],
    items: [
      {
        title: 'Home',
        path: PATH_DASHBOARD.general.home,
        icon: ICONS.dashboard
      },
      {
        title: 'services',
        path: PATH_DASHBOARD.integrations.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Your Services', path: PATH_DASHBOARD.integrations.list },
          { title: 'Connect', path: PATH_DASHBOARD.integrations.create }
        ]
      },
      {
        title: 'data consents',
        path: PATH_DASHBOARD.consent.root,
        icon: ICONS.analytics
      }
    ]
  },

  // GENERAL - Partner
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    userTypes: ['Partner'],
    items: [
      {
        title: 'Home',
        path: PATH_DASHBOARD.general.home,
        icon: ICONS.dashboard
      },
      {
        title: 'relationships',
        path: PATH_DASHBOARD.relationship.root,
        icon: ICONS.analytics,
        children: [
          { title: 'Your Relationships', path: PATH_DASHBOARD.relationship.list },
          { title: 'Invite', path: PATH_DASHBOARD.relationship.create }
        ]
      }
    ]
  },

  // GENERAL - Admin
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    userTypes: ['Administrator'],
    items: [
      {
        title: 'Home',
        path: PATH_DASHBOARD.general.home,
        icon: ICONS.dashboard
      }
    ]
  },

  {
    subheader: 'membership',
    userTypes: ['Administrator'],
    items: [
      {
        title: 'partners',
        path: PATH_DASHBOARD.partner.list,
        icon: ICONS.ecommerce
      },
      {
        title: 'businesses',
        path: PATH_DASHBOARD.business.list,
        icon: ICONS.ecommerce
      }
    ]
  },

  // REPORTS
  // ----------------------------------------------------------------------
  {
    subheader: 'reports',
    userTypes: ['Merchant'],
    items: [
      {
        title: 'bank transactions',
        path: PATH_DASHBOARD.reports.bankTransactions,
        icon: ICONS.banking
      },
      {
        title: 'commerce transactions',
        path: PATH_DASHBOARD.reports.commerceTransactions,
        icon: ICONS.ecommerce
      }
    ]
  },

  // SETTINGS
  // ----------------------------------------------------------------------
  {
    subheader: 'settings',
    userTypes: ['Merchant', 'Partner', 'Administrator'],
    items: [
      {
        title: 'users',
        path: PATH_DASHBOARD.user.list,
        icon: ICONS.user
      },
      {
        title: 'settings',
        path: PATH_DASHBOARD.redirect.settings,
        icon: ICONS.settings
      }
    ]
  }
];

const userSidebar = (userType) => {
  const sidebar = sidebarConfig.filter((_config) => _config.userTypes.includes(userType));

  return sidebar;
};

export { sidebarConfig, userSidebar };
