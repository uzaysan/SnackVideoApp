import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../../screens/TabScreens/HomeScreen';
import ExploreScreen from '../../screens/TabScreens/ExploreScreen';
import NotificationScreen from '../../screens/TabScreens/NotificationScreen';
import ProfileScreen from '../../screens/TabScreens/ProfileScreen';

import BottomNavigationBar from './BottomNavigationBar';

const Tab = createBottomTabNavigator();

const TabNavigation = props => {
  return (
    <Tab.Navigator tabBar={props => <BottomNavigationBar {...props} />}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
      <Tab.Screen name="Notification" component={NotificationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
