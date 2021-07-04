import React from 'react';
import {
  useColorScheme,
  View,
  TouchableHighlight,
  StyleSheet,
} from 'react-native';
import {colors_dark, colors_light} from '../../values/Colors';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
const itemSize = 26;

const BottomNavigationBar = ({state, descriptors, navigation}) => {
  const isDarkMode = useColorScheme() === 'dark';
  const iconColor = isDarkMode ? 'white' : 'black';
  const onItemClick = item => {
    let tabName = 'Home';
    switch (item) {
      case 0:
        tabName = 'Home';
        break;
      case 1:
        tabName = 'Explore';
        break;
      case 2:
        tabName = 'Upload';
        break;
      case 3:
        tabName = 'Notification';
        break;
      case 4:
        tabName = 'Profile';
        break;
    }
    if (tabName === 'Upload') {
      navigation.push('Explore');
      return;
    }
    const event = navigation.emit({
      type: 'tabPress',
      target: item,
    });

    if (!event.defaultPrevented) {
      navigation.navigate(tabName);
    }
  };
  return (
    <View
      style={{
        backgroundColor: isDarkMode
          ? colors_dark.colorPrimary
          : colors_light.colorPrimary,
        height: 50,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      }}>
      <TouchableHighlight
        style={styles.item}
        onPress={() => {
          onItemClick(0);
        }}
        underlayColor={
          isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
        }>
        {state.index === 0 ? (
          <Ionicons name="home" size={itemSize} color={iconColor} />
        ) : (
          <Ionicons name="home-outline" size={itemSize} color={iconColor} />
        )}
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.item}
        onPress={() => {
          onItemClick(1);
        }}
        underlayColor={
          isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
        }>
        {state.index === 1 ? (
          <Ionicons name="compass" size={itemSize} color={iconColor} />
        ) : (
          <Ionicons name="compass-outline" size={itemSize} color={iconColor} />
        )}
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.item}
        onPress={() => {
          onItemClick(2);
        }}
        underlayColor={
          isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
        }>
        <FontAwesome name="plus-square-o" size={itemSize} color={iconColor} />
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.item}
        onPress={() => {
          onItemClick(3);
        }}
        underlayColor={
          isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
        }>
        {state.index + 1 === 3 ? (
          <Ionicons
            name="notifications-sharp"
            size={itemSize}
            color={iconColor}
          />
        ) : (
          <Ionicons
            name="ios-notifications-outline"
            size={itemSize}
            color={iconColor}
          />
        )}
      </TouchableHighlight>

      <TouchableHighlight
        style={styles.item}
        onPress={() => {
          onItemClick(4);
        }}
        underlayColor={
          isDarkMode ? colors_dark.colorPrimary : colors_light.colorPrimary
        }>
        {state.index + 1 === 4 ? (
          <Ionicons name="person" size={itemSize} color={iconColor} />
        ) : (
          <Ionicons
            name="ios-person-outline"
            size={itemSize}
            color={iconColor}
          />
        )}
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    height: '100%',
    borderRadius: 2,
  },
  roundImageWrapper: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

export default BottomNavigationBar;
