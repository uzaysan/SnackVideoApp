import React from 'react';
import {useColorScheme, View, StatusBar} from 'react-native';
import {colors_dark, colors_light} from './values/Colors';
import {store, persistor} from './store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import Navigation from './navigation/Navigation';

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
