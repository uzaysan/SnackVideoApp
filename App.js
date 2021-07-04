import React from 'react';
import {useColorScheme, View, StatusBar} from 'react-native';
import {colors_dark, colors_light} from './values/Colors';
import LoginScreen from './screens/LoginScreen/LoginScreen';
import {store, persistor} from './store/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: isDarkMode ? 'black' : 'white',
            flex: 1,
          }}>
          <StatusBar
            barStyle={isDarkMode ? 'light-content' : 'dark-content'}
            backgroundColor={
              isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
            }
          />
          <LoginScreen />
        </View>
      </PersistGate>
    </Provider>
  );
};

export default App;
