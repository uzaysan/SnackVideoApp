import React from 'react';
import {View, ActivityIndicator, useColorScheme} from 'react-native';
import {colors_dark, colors_light} from '../values/Colors';

const ProgressBar = props => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator
        size={40}
        color={isDarkMode ? colors_dark.textColor : colors_light.textColor}
      />
    </View>
  );
};

export default ProgressBar;
