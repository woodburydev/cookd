import { DefaultTheme } from '@react-navigation/native';
import React from 'react';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import { HomeRoutes } from './routes';
import { Icon } from '@rneui/base';
import { StyleSheet } from 'react-native';
import ProfileNavigation from '../Profile/ProfileNavigation';
import uuidv4 from 'uuidv4';
import { getKeyValue } from 'src/util/helperFunctions';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from 'src/screens/Login/Components/Header';

export default function HomeTabNavigation() {
  const navTheme = DefaultTheme;

  navTheme.colors.background = AppColorPalette.appBackgroundColor;

  const Tab = createBottomTabNavigator();

  const options = (props: any): BottomTabNavigationOptions => {
    const { route } = props;
    let iconName: string;
    let iconType: string;

    switch (route.name) {
      case HomeRoutes.HOME.displayName:
        iconName = 'home';
        iconType = 'material-community'
        break;
      case HomeRoutes.ORDER.displayName:
        iconName = 'clipboard-text-outline';
        iconType = 'material-community'
        break;
      case HomeRoutes.MESSAGE.displayName:
        iconName = 'message-text-outline';
        iconType = 'material-community'
        break;
      case HomeRoutes.PROFILE.displayName:
        iconName = 'person-circle-outline';
        iconType = 'ionicon'
        break;
      case HomeRoutes.SEARCH.displayName:
        iconName = 'search-outline';
        iconType = 'ionicon'
        break;
      default:
        iconName = '';
        break;
    }
    const defaultReturn = {
      tabBarIcon: ({ focused }: any) => (
        <Icon
          type={iconType}
          name={iconName}
          iconStyle={focused ? styles.focus : undefined}
          size={25}
        />
      ),
      tabBarShowLabel: false,
      headerShown: false,
    }
    if (route.name === HomeRoutes.HOME.displayName) {
      return {
        ...defaultReturn,
        headerShown: true,
        headerStyle: commonStyles.WhiteHeaderBackground,
        header: (headerProps) => {
          return (
            <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
              <Header />
            </SafeAreaView>
          )
        }
      }
    }
    else if (route.name === HomeRoutes.SEARCH.displayName) {
      return {
        ...defaultReturn,
        headerShown: true,
        headerStyle: commonStyles.WhiteHeaderBackground,
        header: (headerProps) => {
          return (
            <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
              <Header headerText="Search" />
            </SafeAreaView>
          )
        }
      }
    }
    else if (route.name === HomeRoutes.ORDER.displayName) {
      return {
        ...defaultReturn,
        headerShown: true,
        headerStyle: commonStyles.WhiteHeaderBackground,
        header: (headerProps) => {
          return (
            <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
              <Header headerText="Manage Orders" />
            </SafeAreaView>
          )
        }
      }
    }
    return defaultReturn
  };

  return (
    <>
      <Tab.Navigator screenOptions={options}>
        {Object.keys(HomeRoutes).map((key: any) => {
          if (key === HomeRoutes.PROFILE.name) {
            return (
              <Tab.Screen
                name={getKeyValue(key)(HomeRoutes).displayName}
                component={ProfileNavigation}
                key={uuidv4()}
              />
            );
          }
          return (
            <Tab.Screen
              name={getKeyValue(key)(HomeRoutes).displayName}
              component={getKeyValue(key)(HomeRoutes).component}
              key={uuidv4()}
            />
          );
        })}
      </Tab.Navigator>
    </>
  );
}

const styles = StyleSheet.create({
  focus: {
    color: AppColorPalette.orange,
  },
});
