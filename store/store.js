import {createStore, combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {authReducer} from './Auth/reducer';

const combinedReducers = combineReducers({
  auth: authReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {store, persistor};
