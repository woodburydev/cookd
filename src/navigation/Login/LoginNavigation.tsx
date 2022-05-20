import { DefaultTheme, useNavigation } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import React, { useContext, useState } from 'react';
import { UserContext } from 'src/context/UserContext';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';
import { LoginRoutes, SignUpRoutes } from './routes';
import auth from '@react-native-firebase/auth';
import Header from 'src/screens/Login/Components/Header';
import { AppColorPalette } from 'src/config/styles';
import { LoginNavigationOptions } from '../NavigationOptions';
import { getKeyValue } from 'src/util/helperFunctions';

export default function LoginNavigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState<number | undefined>(0);
  const [showBackButton, setShowBackButton] = useState(true);
  const Stack: any = createStackNavigator();
  const navTheme = DefaultTheme;
  const navigation = useNavigation();
  navTheme.colors.background = AppColorPalette.appBackgroundColor;
  const { user } = useContext(UserContext);

  const getInitialRoute = () => {
    if (auth().currentUser && !user) {
      const hasEmailAndPassword = auth().currentUser?.providerData[1];
      if (hasEmailAndPassword) {
        return LoginRoutes.FOUND_OUT.name;
      } else {
        return LoginRoutes.SIGN_UP.name;
      }
    } else {
      return LoginRoutes.GET_STARTED.name;
    }
  };

  const getLoaderPercentage = (numberInList: number) => {
    return (1 / Object.keys(SignUpRoutes).length) * numberInList
  }
  // intercepting screen options for control before rendering each route.
  const screenOptions = (
    props: StackNavigationProp<LoginNavigationRoutes, keyof LoginRoutesNames>,
  ): StackNavigationOptions => {
    const routeName = props.route.name
    switch (routeName) {
      case LoginRoutes.PHONE_NUMBER.name:
        setLoading(undefined);
        setIsVisible(true);
        setShowBackButton(true);
        break;
      case LoginRoutes.SIGN_UP.name:
        setLoading(getLoaderPercentage(1));
        setIsVisible(true);
        setShowBackButton(false);
        break;
      case LoginRoutes.EMAIL.name:
        setLoading(getLoaderPercentage(2));
        setIsVisible(true);
        setShowBackButton(true);
        break;
      case LoginRoutes.ENTER_OTP.name:
        setLoading(undefined);
        setIsVisible(true);
        setShowBackButton(true);
        break;
      case LoginRoutes.SET_PASSWORD.name:
        setLoading(getLoaderPercentage(3));
        setIsVisible(true);
        setShowBackButton(true);
        break;
      case LoginRoutes.FOUND_OUT.name:
        setLoading(getLoaderPercentage(4));
        setIsVisible(true);
        setShowBackButton(false);
        break;
      case LoginRoutes.ALLERGIES.name:
        setLoading(getLoaderPercentage(5));
        setIsVisible(true);
        setShowBackButton(true);
        break;
      case LoginRoutes.CUISINES.name:
        setLoading(getLoaderPercentage(6));
        setIsVisible(true);
        setShowBackButton(true);
        break;
      case LoginRoutes.GET_STARTED.name:
        setLoading(undefined);
        setIsVisible(false);
        setShowBackButton(false);
        break;
    }
    if (showBackButton) {
      return {
        headerShown: isVisible,
        header: () =>
          <Header loading={loading} backArrow onPressBack={() => navigation.goBack()}loginPages headerContainerStyle={{ position: 'absolute', zIndex: 100, height: 135 }} />
      };
    }
    return {
      headerShown: isVisible,
      header: () =>
        <Header loading={loading} loginPages headerContainerStyle={{ position: 'absolute', zIndex: 100, height: 135 }} />
    };
  };
  return (
    <>
      <Stack.Navigator
        screenOptions={screenOptions}
        theme={navTheme}
        initialRouteName={getInitialRoute()}>
        {Object.keys(LoginRoutes).map(key => {
          return (
            <Stack.Screen
              name={getKeyValue(key)(LoginRoutes).name}
              component={getKeyValue(key)(LoginRoutes).component}
              key={getKeyValue(key)(LoginRoutes).name}
            />
          );
        })}
      </Stack.Navigator>
    </>
  );
}
