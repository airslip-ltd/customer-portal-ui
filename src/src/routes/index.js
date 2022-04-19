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
import { OwnedViewProvider } from '../contexts/OwnedViewContext';
import { RelationshipProvider } from '../contexts/RelationshipContext';

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
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'forgot', element: <SetPassword /> },
        { path: 'create', element: <CreatePassword /> },
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
      path: 'mockdata',
      children: [
        {
          path: 'authorise/:integration',
          element: (
            <AuthGuard>
              <MockDataLinking />
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
        {
          path: 'home',
          element: (
            <OwnedViewProvider>
              <Home />
            </OwnedViewProvider>
          )
        },
        {
          path: 'redirect',
          children: [
            { element: <Navigate to="/dashboard/integrations/list" replace /> },
            { path: 'settings', element: <SettingsRedirect /> }
          ]
        },
        {
          path: 'integrations',
          children: [
            { element: <Navigate to="/dashboard/integrations/list" replace /> },
            { path: 'list', element: <IntegrationList /> },
            { path: 'create', element: <IntegrationCreate /> },
            { path: 'view/:id', element: <IntegrationView /> }
          ]
        },
        {
          path: 'relationship',
          children: [
            { element: <Navigate to="/dashboard/relationship/list" replace /> },
            { path: 'list', element: <RelationshipList /> },
            { path: 'create', element: <RelationshipCreate /> },
            {
              path: 'view/:id',
              element: <RelationshipView />
            },
            { path: 'edit/:id', element: <RelationshipEdit /> },
            {
              path: 'summary/:partnerRelationshipId/:airslipUserType/:entityId',
              element: (
                <RelationshipProvider>
                  <OwnedViewProvider>
                    <RelationshipSummary />
                  </OwnedViewProvider>
                </RelationshipProvider>
              )
            }
          ]
        },
        {
          path: 'consent',
          children: [
            { element: <Navigate to="/dashboard/consent/list" replace /> },
            { path: 'list', element: <ConsentList /> },
            { path: 'view/:id', element: <ConsentView /> }
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
          path: 'profile',
          children: [
            { element: <Navigate to="/dashboard/profile/view" replace /> },
            { path: 'view', element: <ProfileView /> },
            { path: 'edit', element: <ProfileEdit /> }
          ]
        },
        {
          path: 'partners',
          children: [
            { element: <Navigate to="/dashboard/partners/list" replace /> },
            { path: 'list', element: <PartnerList /> },
            { path: 'create', element: <PartnerCreate /> },
            { path: 'view/:id', element: <PartnerView /> },
            { path: 'edit/:id', element: <PartnerEdit /> },
            { path: 'profile/view', element: <PartnerProfileView /> },
            { path: 'profile/edit', element: <PartnerProfileEdit /> }
          ]
        },
        {
          path: 'business',
          children: [
            { element: <Navigate to="/dashboard/business/list" replace /> },
            { path: 'list', element: <BusinessList /> },
            { path: 'create', element: <BusinessCreate /> },
            { path: 'view/:id', element: <BusinessView /> },
            { path: 'edit/:id', element: <BusinessEdit /> },
            { path: 'profile/view', element: <BusinessProfileView /> },
            { path: 'profile/edit', element: <BusinessProfileEdit /> }
          ]
        },
        {
          path: 'analytics',
          children: [
            { element: <Navigate to="/dashboard/analytics/balances" replace /> },
            {
              path: 'balances',
              element: (
                <RelationshipProvider>
                  <OwnedViewProvider>
                    <AccountBalances />
                  </OwnedViewProvider>
                </RelationshipProvider>
              ),
              children: [
                { path: ':integrationId' },
                { path: ':partnerRelationshipId/:airslipUserType/:entityId' },
                { path: ':integrationId/:partnerRelationshipId/:airslipUserType/:entityId' }
              ]
            },
            {
              path: 'commerce',
              element: (
                <RelationshipProvider>
                  <OwnedViewProvider>
                    <CommerceSummary />
                  </OwnedViewProvider>
                </RelationshipProvider>
              ),
              children: [
                { path: ':integrationId' },
                { path: ':partnerRelationshipId/:airslipUserType/:entityId' },
                { path: ':integrationId/:partnerRelationshipId/:airslipUserType/:entityId' }
              ]
            },
            { path: 'debt-service-coverage-ratio-detail/:accountId', element: <DebtServiceCoverageRatioDetail /> },
            { path: 'banking-recent-transactions', element: <BankingRecentTransactions /> },
            { path: 'debt-ratio-detail/:accountId', element: <DebtRatioDetail /> },
            { path: 'debt-to-capital-ratio-detail/:accountId', element: <DebtToCapitalRatioDetail /> },
            { path: 'revenue-benchmarking-detail', element: <RevenueBenchmarkingDetail /> },
            { path: 'customers-detail/:accountId', element: <CustomersDetail /> }
          ]
        },
        {
          path: 'reporting',
          children: [
            { element: <Navigate to="/dashboard/reporting/list" replace /> },
            {
              path: 'banking-transactions',
              element: (
                <OwnedViewProvider>
                  <BankingTransactionsReport />
                </OwnedViewProvider>
              )
            },
            {
              path: 'commerce-transactions',
              element: (
                <OwnedViewProvider>
                  <CommerceTransactionsReport />
                </OwnedViewProvider>
              )
            },
            {
              path: 'banking-transactions/:partnerRelationshipId/:airslipUserType/:entityId',
              element: (
                <RelationshipProvider>
                  <OwnedViewProvider>
                    <BankingTransactionsReport />
                  </OwnedViewProvider>
                </RelationshipProvider>
              )
            },
            {
              path: 'commerce-transactions/:partnerRelationshipId/:airslipUserType/:entityId',
              element: (
                <RelationshipProvider>
                  <OwnedViewProvider>
                    <CommerceTransactionsReport />
                  </OwnedViewProvider>
                </RelationshipProvider>
              )
            }
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
const SetPassword = Loadable(lazy(() => import('../pages/authentication/SetPassword')));
const CreatePassword = Loadable(lazy(() => import('../pages/authentication/CreatePassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Onboarding
const SetupIntegration = Loadable(lazy(() => import('../pages/setup/SetupIntegration')));
const SetupComplete = Loadable(lazy(() => import('../pages/setup/SetupComplete')));
// Linking
const MockDataLinking = Loadable(lazy(() => import('../pages/linking/MockDataLinking')));
const HubIntegrationAuthorise = Loadable(lazy(() => import('../pages/linking/HubIntegrationAuthorise')));
const HubIntegrationComplete = Loadable(lazy(() => import('../pages/linking/HubIntegrationComplete')));
// Dashboard
const Home = Loadable(lazy(() => import('../pages/dashboard/Home')));
const SettingsRedirect = Loadable(lazy(() => import('../pages/SettingsRedirect')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
const Unauthorised = Loadable(lazy(() => import('../pages/Page401')));
// Integrations
const IntegrationList = Loadable(lazy(() => import('../pages/integrations/IntegrationList')));
const IntegrationCreate = Loadable(lazy(() => import('../pages/integrations/IntegrationCreate')));
const IntegrationView = Loadable(lazy(() => import('../pages/integrations/IntegrationView')));
// Relationships / Businesses
const RelationshipView = Loadable(lazy(() => import('../pages/relationship/RelationshipView')));
const RelationshipEdit = Loadable(lazy(() => import('../pages/relationship/RelationshipEdit')));
const RelationshipList = Loadable(lazy(() => import('../pages/relationship/RelationshipList')));
const RelationshipCreate = Loadable(lazy(() => import('../pages/relationship/RelationshipCreate')));
const RelationshipConsent = Loadable(lazy(() => import('../pages/relationship/RelationshipConsent')));
const RelationshipSummary = Loadable(lazy(() => import('../pages/relationship/RelationshipSummary')));
// Reports
const BankingTransactionsReport = Loadable(lazy(() => import('../pages/reporting/BankingTransactionsReport')));
const CommerceTransactionsReport = Loadable(lazy(() => import('../pages/reporting/CommerceTransactionsReport')));
// Consents
const ConsentView = Loadable(lazy(() => import('../pages/consents/ConsentView')));
const ConsentList = Loadable(lazy(() => import('../pages/consents/ConsentList')));
// Users
const UserList = Loadable(lazy(() => import('../pages/users/UserList')));
const UserView = Loadable(lazy(() => import('../pages/users/UserView')));
const UserEdit = Loadable(lazy(() => import('../pages/users/UserEdit')));
const UserCreate = Loadable(lazy(() => import('../pages/users/UserCreate')));
// Admin
const PartnerCreate = Loadable(lazy(() => import('../pages/partners/PartnerCreate')));
const PartnerList = Loadable(lazy(() => import('../pages/partners/PartnerList')));
const PartnerView = Loadable(lazy(() => import('../pages/partners/PartnerView')));
const PartnerEdit = Loadable(lazy(() => import('../pages/partners/PartnerEdit')));
const PartnerProfileView = Loadable(lazy(() => import('../pages/partners/PartnerProfileView')));
const PartnerProfileEdit = Loadable(lazy(() => import('../pages/partners/PartnerProfileEdit')));
const BusinessCreate = Loadable(lazy(() => import('../pages/business/BusinessCreate')));
const BusinessList = Loadable(lazy(() => import('../pages/business/BusinessList')));
const BusinessView = Loadable(lazy(() => import('../pages/business/BusinessView')));
const BusinessEdit = Loadable(lazy(() => import('../pages/business/BusinessEdit')));
const BusinessProfileView = Loadable(lazy(() => import('../pages/business/BusinessProfileView')));
const BusinessProfileEdit = Loadable(lazy(() => import('../pages/business/BusinessProfileEdit')));
// Profile
const ProfileView = Loadable(lazy(() => import('../pages/users/ProfileView')));
const ProfileEdit = Loadable(lazy(() => import('../pages/users/ProfileEdit')));
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
const CustomersDetail = Loadable(lazy(() => import('../pages/analytics/CustomersDetail')));
