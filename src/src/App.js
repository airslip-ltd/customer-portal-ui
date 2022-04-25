// routes
import { BreakpointProvider } from 'react-socks';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// hooks
import useAuth from './hooks/useAuth';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import NotistackProvider from './components/NotistackProvider';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import LoadingScreen from './components/LoadingScreen';
import ThemeLocalization from './components/ThemeLocalization';
import { BaseOptionChartStyle } from './components/charts/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  const { isInitialized } = useAuth();

  return (
    <BreakpointProvider>
      <ThemeConfig>
        <ThemePrimaryColor>
          <ThemeLocalization>
            <RtlLayout>
              <NotistackProvider>
                <GlobalStyles />
                <BaseOptionChartStyle />
                <Settings />
                <ScrollToTop />
                {isInitialized ? <Router /> : <LoadingScreen />}
              </NotistackProvider>
            </RtlLayout>
          </ThemeLocalization>
        </ThemePrimaryColor>
      </ThemeConfig>
    </BreakpointProvider>
  );
}
