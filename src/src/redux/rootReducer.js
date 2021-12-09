import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import merchantReducer from './slices/merchant';
import accountReducer from './slices/accounts';
import bankReducer from './slices/banks';

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
  bank: bankReducer
});

export { rootPersistConfig, rootReducer };
