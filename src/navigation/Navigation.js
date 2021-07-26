import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

//Screens
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import TabNavigation from './Tabs/TabNavigation';
import ExploreScreen from '../screens/TabScreens/ExploreScreen';
import ProfileScreen from '../screens/TabScreens/ProfileScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import CommentsScreen from '../screens/CommentsScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HashtagScreen from '../screens/HashtagScreen';
import ProfilePostsScreen from '../screens/ProfilePostsScreen';

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
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="HashtagScreen" component={HashtagScreen} />
        <Stack.Screen
          name="ProfilePostsScreen"
          component={ProfilePostsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
