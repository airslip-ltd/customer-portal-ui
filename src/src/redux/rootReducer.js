import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import businessReducer from './slices/business';
import accountReducer from './slices/accounts';
import providerReducer from './slices/providers';
import integrationReducer from './slices/integrations';
import registerReducer from './slices/register';
import partnerReducer from './slices/partner';
import relationshipReducer from './slices/relationship';
import analyticsReducer from './slices/analytics';
import balancesReducer from './slices/balances';
import transactionsReducer from './slices/transactions';

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
  transactions: transactionsReducer
});

export { rootPersistConfig, rootReducer };
