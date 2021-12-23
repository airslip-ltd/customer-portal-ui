import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import businessReducer from './slices/business';
import accountReducer from './slices/accounts';
import bankReducer from './slices/banks';
import providerReducer from './slices/providers';
import integrationReducer from './slices/integrations';
import registerReducer from './slices/register';
import partnerReducer from './slices/partner';
import relationshipReducer from './slices/relationship';

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
  bank: bankReducer,
  provider: providerReducer,
  integration: integrationReducer,
  register: registerReducer,
  partner: partnerReducer,
  relationship: relationshipReducer
});

export { rootPersistConfig, rootReducer };
