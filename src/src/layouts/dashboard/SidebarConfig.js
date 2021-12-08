// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  banking: getIcon('ic_banking')
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'Home',
        path: PATH_DASHBOARD.general.home,
        icon: ICONS.dashboard
      },
      {
        title: 'merchants',
        path: PATH_DASHBOARD.merchants.root,
        icon: ICONS.user,
        children: [{ title: 'List', path: PATH_DASHBOARD.merchants.list }]
      }
    ]
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      {
        title: 'user',
        path: PATH_DASHBOARD.user.root,
        icon: ICONS.user,
        children: [
          { title: 'Four', path: PATH_DASHBOARD.user.pageFour },
          { title: 'Five', path: PATH_DASHBOARD.user.pageFive },
          { title: 'Six', path: PATH_DASHBOARD.user.pageSix }
        ]
      },
      {
        title: 'accounts',
        path: PATH_DASHBOARD.accounts.root,
        icon: ICONS.banking,
        children: [
          { title: 'List', path: PATH_DASHBOARD.accounts.list },
          { title: 'Link', path: PATH_DASHBOARD.accounts.link }
        ]
      }
    ]
  }
];

export default sidebarConfig;
