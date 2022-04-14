import {DefaultTheme} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useContext} from 'react';
import {DEFAULT_APP_COLOR} from 'src/config/styles';
import {UserContext} from 'src/context/UserContext';
import {verticalAnimation} from '@navigation/NavigationTypes';
import {LoginRoutes} from './routes';
import auth from '@react-native-firebase/auth';
import {getKeyValue} from '@navigation/NavigationTypes';

export default function LoginNavigation() {
  const Stack: any = createStackNavigator();
  const navTheme = DefaultTheme;

  navTheme.colors.background = DEFAULT_APP_COLOR;
  const {user} = useContext(UserContext);

  const getInitialRoute = () => {
    if (auth().currentUser && !user) {
      const hasEmailAndPassword = auth().currentUser?.providerData[1];
      if (hasEmailAndPassword) {
        return LoginRoutes.ALLERGIES.name;
      } else {
        return LoginRoutes.SET_PASSWORD.name;
      }
    } else {
      return LoginRoutes.GET_STARTED.name;
    }
  };

  return (
    <>
      <Stack.Navigator
        screenOptions={verticalAnimation}
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
