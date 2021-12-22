import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import merchantReducer from './slices/merchant';
import accountReducer from './slices/accounts';
import bankReducer from './slices/banks';
import providerReducer from './slices/providers';
import integrationReducer from './slices/integrations';
import registerReducer from './slices/register';
import partnerReducer from './slices/partner';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  account: accountReducer,
  merchant: merchantReducer,
  bank: bankReducer,
  provider: providerReducer,
  integration: integrationReducer,
  register: registerReducer,
  partner: partnerReducer
});

export { rootPersistConfig, rootReducer };
