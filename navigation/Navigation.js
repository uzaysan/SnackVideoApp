import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//Screens
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import TabNavigation from './Tabs/TabNavigation';
import ExploreScreen from '../screens/TabScreens/ExploreScreen';

const Stack = createStackNavigator();

const Navigation = props => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Tabs" component={TabNavigation} />
        <Stack.Screen name="Explore" component={ExploreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
