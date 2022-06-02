import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigation from './MainTabNavigation';
import {MainNavigationOptions} from '../NavigationOptions';

export default function MainNavigation() {
  const Stack: any = createStackNavigator();
  return (
    <Stack.Navigator screenOptions={MainNavigationOptions}>
      <Stack.Screen name="MAIN_TAB_NAVIGATION" component={MainTabNavigation} />
    </Stack.Navigator>
  );
}
