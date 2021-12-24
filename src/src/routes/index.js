import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// components
import LoadingScreen from '../components/LoadingScreen';
// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },

    {
      path: 'referral',
      children: [
        {
          path: ':referralId',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        }
      ]
    },

    {
      path: 'linking',
      children: [
        {
          path: 'bank',
          element: (
            <AuthGuard>
              <BankAccount />
            </AuthGuard>
          )
        }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/home" replace /> },
        { path: 'home', element: <Home /> },
        {
          path: 'accounts',
          children: [
            { element: <Navigate to="/dashboard/accounts/list" replace /> },
            { path: 'list', element: <AccountList /> },
            { path: 'link', element: <AccountLink /> },
            { path: ':institutionId/link', element: <AccountLinking /> }
          ]
        },
        {
          path: 'integrations',
          children: [
            { element: <Navigate to="/dashboard/integrations/list" replace /> },
            { path: 'list', element: <IntegrationList /> },
            { path: 'link', element: <IntegrationLink /> },
            { path: ':provider/link', element: <IntegrationLinked /> }
          ]
        },
        {
          path: 'relationship',
          children: [
            { element: <Navigate to="/dashboard/relationsip/list" replace /> },
            { path: 'list', element: <RelationshipList /> },
            { path: 'create', element: <RelationshipCreate /> },
            { path: ':id/view', element: <RelationshipView /> }
          ]
        },
        {
          path: 'admin/partners',
          children: [
            { element: <Navigate to="/dashboard/admin/partners/list" replace /> },
            { path: 'register', element: <PartnerRegister /> }
          ]
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '/', element: <Navigate to="/auth/login" replace /> },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Linking
const BankAccount = Loadable(lazy(() => import('../pages/linking/BankAccount')));
// Dashboard
const Home = Loadable(lazy(() => import('../pages/dashboard/Home')));
const AccountList = Loadable(lazy(() => import('../pages/accounts/AccountList')));
const AccountLink = Loadable(lazy(() => import('../pages/accounts/AccountLink')));
const AccountLinking = Loadable(lazy(() => import('../pages/accounts/AccountLinking')));
const IntegrationList = Loadable(lazy(() => import('../pages/integrations/IntegrationList')));
const IntegrationLink = Loadable(lazy(() => import('../pages/integrations/IntegrationLink')));
const IntegrationLinked = Loadable(lazy(() => import('../pages/integrations/IntegrationLinked')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Merchants
const RelationshipView = Loadable(lazy(() => import('../pages/relationship/View')));
const RelationshipList = Loadable(lazy(() => import('../pages/relationship/List')));
const RelationshipCreate = Loadable(lazy(() => import('../pages/relationship/Create')));
// Admin
const PartnerRegister = Loadable(lazy(() => import('../pages/admin/partner/Register')));
