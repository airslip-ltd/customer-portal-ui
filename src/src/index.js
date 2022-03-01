// scroll bar
import 'simplebar/src/simplebar.css';

// mock api
// import './_apis_';

import ReactDOM from 'react-dom';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Provider as ReduxProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';
// contexts
import TimeAgo from 'javascript-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import ru from 'javascript-time-ago/locale/ru.json';
import { SettingsProvider, CollapseDrawerProvider, AuthProvider, MemberProvider } from './contexts';

// redux
import { store, persistor } from './redux/store';
// components
import LoadingScreen from './components/LoadingScreen';
//
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);
// ----------------------------------------------------------------------

ReactDOM.render(
  <StrictMode>
    <HelmetProvider>
      <ReduxProvider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <SettingsProvider>
            <CollapseDrawerProvider>
              <BrowserRouter>
                <AuthProvider>
                  <MemberProvider>
                    <App />
                  </MemberProvider>
                </AuthProvider>
              </BrowserRouter>
            </CollapseDrawerProvider>
          </SettingsProvider>
        </PersistGate>
      </ReduxProvider>
    </HelmetProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
