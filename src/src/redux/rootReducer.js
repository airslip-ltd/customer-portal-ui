import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import businessReducer from './slices/business';
import accountReducer from './slices/accounts';
import providerReducer from './slices/providers';
import integrationReducer from './slices/integration';
import registerReducer from './slices/register';
import partnerReducer from './slices/partner';
import relationshipReducer from './slices/relationship';
import consentReducer from './slices/consent';
import analyticsReducer from './slices/analytics';
import balancesReducer from './slices/balances';
import commerceReducer from './slices/commerce';
import reportsReducer from './slices/reports';
import userReducer from './slices/user';
import authReducer from './slices/auth';
import countriesReducer from './slices/countries';
import dataListsReducer from './slices/dataLists';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  account: accountReducer,
  business: businessReducer,
  provider: providerReducer,
  integration: integrationReducer,
  register: registerReducer,
  partner: partnerReducer,
  relationship: relationshipReducer,
  analytics: analyticsReducer,
  balances: balancesReducer,
  reports: reportsReducer,
  user: userReducer,
  auth: authReducer,
  consent: consentReducer,
  commerce: commerceReducer,
  countries: countriesReducer,
  dataLists: dataListsReducer
});

export { rootPersistConfig, rootReducer };
