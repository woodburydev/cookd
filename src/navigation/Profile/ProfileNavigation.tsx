import {DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {DEFAULT_APP_COLOR} from 'src/config/styles';
import {ProfileRoutes} from './routes';
import {
  getKeyValue,
  ProfileNavigationOptions,
} from '@navigation/NavigationTypes';
import {HomeRoutes} from '../Home/routes';
import uuidv4 from 'uuidv4';

export default function ProfileNavigation() {
  const Stack: any = createStackNavigator();
  const navTheme = DefaultTheme;

  navTheme.colors.background = DEFAULT_APP_COLOR;
  return (
    <Stack.Navigator screenOptions={ProfileNavigationOptions}>
      <Stack.Screen
        name={HomeRoutes.PROFILE.name}
        component={HomeRoutes.PROFILE.component}
        key={uuidv4()}
      />
      {Object.keys(ProfileRoutes).map(key => {
        return (
          <Stack.Screen
            name={getKeyValue(key)(ProfileRoutes).name}
            component={getKeyValue(key)(ProfileRoutes).component}
            key={uuidv4()}
          />
        );
      })}
    </Stack.Navigator>
  );
}
