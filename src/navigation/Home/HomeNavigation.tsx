import {DefaultTheme} from '@react-navigation/native';
import React from 'react';
import {AppColorPalette, DEFAULT_APP_COLOR} from 'src/config/styles';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {HomeRoutes} from './routes';
import {getKeyValue} from '../NavigationTypes';
import {Icon} from '@rneui/base';
import {StyleSheet} from 'react-native';

export default function HomeNavigation() {
  const navTheme = DefaultTheme;

  navTheme.colors.background = DEFAULT_APP_COLOR;

  const Tab = createBottomTabNavigator();

  const options = (props: any): BottomTabNavigationOptions => {
    const {route} = props;
    let iconName: string;

    switch (route.name) {
      case HomeRoutes.HOME.displayName:
        iconName = 'home';
        break;
      case HomeRoutes.ORDER.displayName:
        iconName = 'silverware-fork-knife';
        break;
      case HomeRoutes.MESSAGE.displayName:
        iconName = 'message-text-outline';
        break;
      case HomeRoutes.PROFILE.displayName:
        iconName = 'person-circle-outline';
        break;
      case HomeRoutes.SEARCH.displayName:
        iconName = 'search-outline';
        break;
      default:
        iconName = '';
        break;
    }
    return {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      tabBarIcon: ({focused, color, size}) => (
        <Icon
          type={
            route.name === HomeRoutes.PROFILE.displayName ||
            route.name === HomeRoutes.SEARCH.displayName
              ? 'ionicon'
              : 'material-community'
          }
          name={iconName}
          iconStyle={focused ? styles.focus : undefined}
          size={25}
        />
      ),
      tabBarShowLabel: false,
      headerShown: false,
    };
  };

  return (
    <Tab.Navigator screenOptions={options}>
      {Object.keys(HomeRoutes).map(key => {
        return (
          <Tab.Screen
            name={getKeyValue(key)(HomeRoutes).displayName}
            component={getKeyValue(key)(HomeRoutes).component}
            key={getKeyValue(key)(HomeRoutes).name}
          />
        );
      })}
    </Tab.Navigator>
  );
}

export const styles = StyleSheet.create({
  focus: {
    color: AppColorPalette.orange,
  },
});
