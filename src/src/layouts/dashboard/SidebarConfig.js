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
  booking: getIcon('ic_booking')
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
          { title: 'Create', path: PATH_DASHBOARD.relationship.create },
          { title: 'List', path: PATH_DASHBOARD.relationship.list }
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
      },
      {
        title: 'partners',
        path: PATH_DASHBOARD.admin.partners.root,
        icon: ICONS.ecommerce,
        children: [{ title: 'Register', path: PATH_DASHBOARD.admin.partners.register }]
      }
    ]
  },

  // SERVICES
  // ----------------------------------------------------------------------
  {
    subheader: 'services',
    userTypes: ['Merchant'],
    items: [
      {
        title: 'integrations',
        path: PATH_DASHBOARD.integrations.root,
        icon: ICONS.ecommerce,
        children: [
          { title: 'List', path: PATH_DASHBOARD.integrations.list },
          { title: 'Add', path: PATH_DASHBOARD.integrations.link }
        ]
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
    userTypes: ['Merchant', 'Partner'],
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: []
      }
    ]
  }
];

const userSidebar = (userType) => {
  const sidebar = sidebarConfig.filter((_config) => _config.userTypes.includes(userType));

  return sidebar;
};

export { sidebarConfig, userSidebar };
