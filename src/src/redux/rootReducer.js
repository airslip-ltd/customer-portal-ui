import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import merchantReducer from './slices/merchant';
import accountReducer from './slices/accounts';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

// const productPersistConfig = {
//   key: 'product',
//   storage,
//   keyPrefix: 'redux-',
//   whitelist: ['sortBy', 'checkout']
// };

const rootReducer = combineReducers({
  account: accountReducer,
  merchant: merchantReducer
});

export { rootPersistConfig, rootReducer };
