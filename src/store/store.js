import {createStore, combineReducers} from 'redux';
import {persistReducer, persistStore} from 'redux-persist';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {authReducer} from './Auth/reducer';
import {postReducer} from './Post/reducer';
import {userReducer} from './User/reducer';
import {commentReducer} from './Comment/reducer';
import {notificationReducer} from './Notification/reducer';

const combinedReducers = combineReducers({
  auth: authReducer,
  post: postReducer,
  user: userReducer,
  comment: commentReducer,
  notification: notificationReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, combinedReducers);
const store = createStore(persistedReducer);
const persistor = persistStore(store);
export {store, persistor};
