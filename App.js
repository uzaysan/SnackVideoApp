import React from 'react';
import {useColorScheme, View, StatusBar} from 'react-native';
import {colors_dark, colors_light} from './src/values/Colors';
import {store, persistor} from './src/store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './src/navigation/Navigation';

import Parse from 'parse/react-native.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL, PARSE_APP_ID, PARSE_JS_KEY} from './keys';

Parse.setAsyncStorage(AsyncStorage);
Parse.initialize(PARSE_APP_ID, PARSE_JS_KEY);
Parse.serverURL = BASE_URL;

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={
            isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
          }
        />
        <Navigation />
      </PersistGate>
    </Provider>
  );
};

export default App;
