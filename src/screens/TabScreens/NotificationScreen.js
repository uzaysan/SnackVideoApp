import React from 'react';
import {View, useColorScheme, Text} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';

const NotificationScreen = props => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: isDarkMode
          ? colors_dark.backgroundColor
          : colors_light.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: isDarkMode ? colors_dark.textColor : colors_light.textColor,
        }}>
        Notification Screen
      </Text>
    </View>
  );
};

export default NotificationScreen;
