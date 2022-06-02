import {DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import uuidv4 from 'uuidv4';
import {AppColorPalette} from 'src/config/styles';
import {getKeyValue} from 'src/util/helperFunctions';
import {HomeRoutes} from './routes';
import {HomeNavigationOptions} from '../NavigationOptions';

export default function HomeNavigation() {
  const Stack: any = createStackNavigator();
  const navTheme = DefaultTheme;

  navTheme.colors.background = AppColorPalette.appBackgroundColor;
  return (
    <Stack.Navigator screenOptions={HomeNavigationOptions}>
      {Object.keys(HomeRoutes).map(key => {
        return (
          <Stack.Screen
            name={getKeyValue(key)(HomeRoutes).name}
            component={getKeyValue(key)(HomeRoutes).component}
            key={uuidv4()}
          />
        );
      })}
    </Stack.Navigator>
  );
}
