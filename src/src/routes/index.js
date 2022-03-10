import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import SetupGuard from '../guards/SetupGuard';
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
            <AuthGuard>
              <RelationshipConsent />
            </AuthGuard>
          )
        }
      ]
    },

    {
      path: 'integrate',
      children: [
        {
          path: 'authorise/:provider/:integration',
          element: <HubIntegrationAuthorise />
        }
      ]
    },
    {
      path: 'integrate',
      children: [
        {
          path: 'complete/:provider/:integration',
          element: (
            <AuthGuard>
              <HubIntegrationComplete />
            </AuthGuard>
          )
        }
      ]
    },
    {
      path: 'onboarding',
      children: [
        {
          path: 'integrate',
          element: (
            <AuthGuard>
              <SetupIntegration />
            </AuthGuard>
          )
        },
        {
          path: 'complete',
          element: (
            <AuthGuard>
              <SetupComplete />
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
          <SetupGuard>
            <DashboardLayout />
          </SetupGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to="/dashboard/home" replace /> },
        { path: 'home', element: <Home /> },
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
            { element: <Navigate to="/dashboard/relationship/list" replace /> },
            { path: 'list', element: <RelationshipList /> },
            { path: 'create', element: <RelationshipCreate /> },
            { path: ':id/view', element: <RelationshipView /> }
          ]
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/list" replace /> },
            { path: 'list', element: <UserList /> },
            { path: 'create', element: <UserCreate /> },
            { path: 'view/:id', element: <UserView /> },
            { path: 'edit/:id', element: <UserEdit /> }
          ]
        },
        {
          path: 'admin/partners',
          children: [
            { element: <Navigate to="/dashboard/admin/partners/list" replace /> },
            { path: 'register', element: <PartnerRegister /> }
          ]
        },
        {
          path: 'analytics',
          children: [
            { element: <Navigate to="/dashboard/analytics/balances" replace /> },
            { path: 'balances', element: <AccountBalances /> },
            { path: 'commerce', element: <CommerceSummary /> },
            { path: 'debt-service-coverage-ratio-detail/:accountId', element: <DebtServiceCoverageRatioDetail /> },
            { path: 'banking-recent-transactions', element: <BankingRecentTransactions /> },
            { path: 'debt-ratio-detail/:accountId', element: <DebtRatioDetail /> },
            { path: 'debt-to-capital-ratio-detail/:accountId', element: <DebtToCapitalRatioDetail /> },
            { path: 'revenue-benchmarking-detail', element: <RevenueBenchmarkingDetail /> }
          ]
        },
        {
          path: 'reporting',
          children: [
            { element: <Navigate to="/dashboard/reporting/list" replace /> },
            { path: 'banking-transactions', element: <BankingTransactionsReport /> },
            { path: 'commerce-transactions', element: <CommerceTransactionsReport /> }
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
        { path: '401', element: <Unauthorised /> },
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
// Onboarding
const SetupIntegration = Loadable(lazy(() => import('../pages/setup/SetupIntegration')));
const SetupComplete = Loadable(lazy(() => import('../pages/setup/SetupComplete')));
// Linking
const HubIntegrationAuthorise = Loadable(lazy(() => import('../pages/linking/HubIntegrationAuthorise')));
const HubIntegrationComplete = Loadable(lazy(() => import('../pages/linking/HubIntegrationComplete')));
// Dashboard
const Home = Loadable(lazy(() => import('../pages/dashboard/Home')));
const IntegrationList = Loadable(lazy(() => import('../pages/integrations/IntegrationList')));
const IntegrationLink = Loadable(lazy(() => import('../pages/integrations/IntegrationLink')));
const IntegrationLinked = Loadable(lazy(() => import('../pages/integrations/IntegrationLinked')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const Unauthorised = Loadable(lazy(() => import('../pages/Page401')));
// Relationships
const RelationshipView = Loadable(lazy(() => import('../pages/relationship/RelationshipView')));
const RelationshipList = Loadable(lazy(() => import('../pages/relationship/RelationshipList')));
const RelationshipCreate = Loadable(lazy(() => import('../pages/relationship/RelationshipCreate')));
const RelationshipConsent = Loadable(lazy(() => import('../pages/relationship/RelationshipConsent')));
// Users
const UserList = Loadable(lazy(() => import('../pages/users/UserList')));
const UserView = Loadable(lazy(() => import('../pages/users/UserView')));
const UserEdit = Loadable(lazy(() => import('../pages/users/UserEdit')));
const UserCreate = Loadable(lazy(() => import('../pages/users/UserCreate')));
// Admin
const PartnerRegister = Loadable(lazy(() => import('../pages/admin/partner/Register')));
// Analytics
const AccountBalances = Loadable(lazy(() => import('../pages/analytics/AccountBalances')));
const CommerceSummary = Loadable(lazy(() => import('../pages/analytics/CommerceSummary')));
const DebtServiceCoverageRatioDetail = Loadable(
  lazy(() => import('../pages/analytics/DebtServiceCoverageRatioDetail'))
);
const BankingRecentTransactions = Loadable(lazy(() => import('../pages/analytics/BankingRecentTransactions')));
const DebtRatioDetail = Loadable(lazy(() => import('../pages/analytics/DebtRatioDetail')));
const DebtToCapitalRatioDetail = Loadable(lazy(() => import('../pages/analytics/DebtToCapitalRatioDetail')));
const RevenueBenchmarkingDetail = Loadable(lazy(() => import('../pages/analytics/RevenueBenchmarkingDetail')));
// Reporting
const BankingTransactionsReport = Loadable(lazy(() => import('../pages/reporting/BankingTransactionsReport')));
const CommerceTransactionsReport = Loadable(lazy(() => import('../pages/reporting/CommerceTransactionsReport')));
