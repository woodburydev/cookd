import {Button, Icon, Input, Text} from '@rneui/themed';
import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';
import {commonStyles} from '@config/styles';
import {LoginRoutes} from '@navigation/Login/routes';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';
import Header from './Components/Header';

export default function EnterOTP() {
  const navigation = useNavigation();
  const route =
    useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['ENTER_OTP']>>();

  const {confirm} = route.params;
  const sign_up = route.params.sign_up;

  let notInDB: boolean | undefined;
  let firstName: string | undefined;
  let lastName: string | undefined;
  let email: string | undefined;

  if (sign_up) {
    notInDB = sign_up.notInDB;
    firstName = sign_up.userInformation.firstName;
    lastName = sign_up.userInformation.lastName;
    email = sign_up.userInformation.email;
  }

  const [userOTP, setUserOTP] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorText, setErrorText] = useState('');
  const signup = useCallback(async () => {
    await auth().currentUser?.updateProfile({
      displayName: `${firstName} ${lastName}`,
    });
  }, [firstName, lastName]);

  const login = useCallback(() => {
    return new Promise(async (resolve, reject) => {
      confirm
        .confirm(userOTP)
        .then(res => {
          resolve(res);
        })
        .catch(err => {
          reject(err);
        });
    });
  }, [confirm, userOTP]);

  useEffect(() => {
    if (userOTP.length === 6 && !errorText && !loading) {
      setLoading(true);
      login()
        .then(() => {
          if (sign_up) {
            return signup()
              .then(() => {
                if (notInDB) {
                  // user has fully registered, but not in database.
                  navigation.navigate(
                    LoginRoutes.ALLERGIES.name as LoginRoutesNames['ALLERGIES'],
                  );
                } else {
                  if (email) {
                    navigation.navigate(
                      LoginRoutes.SET_PASSWORD
                        .name as LoginRoutesNames['SET_PASSWORD'],
                      {email},
                    );
                  } else {
                    console.log('Email should be defined! Please pass props.');
                    setLoading(false);
                  }
                }
              })
              .catch(err => {
                console.log(err);
                setLoading(false);
                setErrorText('Invalid Code');
              });
          } else {
            console.log(
              'Successfully authenticated login, will route to home page.',
            );
          }
        })
        .catch(err => {
          if (err?.code === 'auth/invalid-verification-code') {
            setErrorText('Invalid Code');
          } else if (err.code === 'auth/missing-verification-code') {
            setErrorText('Missing Verification Code');
          } else {
            console.log(err);
          }
          setLoading(false);
        });
    }
  }, [
    userOTP,
    login,
    navigation,
    signup,
    email,
    notInDB,
    loading,
    errorText,
    sign_up,
  ]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        commonStyles.FlexColCenterStart,
        commonStyles.FlexGrow,
      ]}>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.KeyboardView}
        keyboardVerticalOffset={-150}>
        <Header
          loading={sign_up ? '40%' : '0%'}
          upArrow
          onPressUp={() =>
            sign_up
              ? navigation.navigate(
                  LoginRoutes.SIGN_UP.name as LoginRoutesNames['SIGN_UP'],
                )
              : navigation.navigate(
                  LoginRoutes.SIGN_IN.name as LoginRoutesNames['SIGN_IN'],
                )
          }
        />
        <View style={styles.ContentContainer}>
          <View style={styles.SectionStyle}>
            <Icon
              type="material-community"
              name="shield-lock-outline"
              style={styles.lockLogo}
              size={30}
            />
            <Text style={styles.labelText} type="header">
              Verification Code
            </Text>
            <Input
              shake={() => {}}
              style={styles.inputStyle}
              onChangeText={input => {
                setUserOTP(input);
                setErrorText('');
              }}
              placeholderTextColor="#8b9cb5"
              keyboardType="number-pad"
              maxLength={6}
              errorMessage={errorText}
              underlineColorAndroid="#f000"
              rightIcon={
                loading ? <ActivityIndicator color="#1C0000" /> : undefined
              }
              blurOnSubmit={false}
            />
            <Text style={styles.descriptionText} type="info">
              You’ll recieve a text with a code within a couple minutes.
            </Text>
            <Text style={styles.descriptionText} type="info">
              Check your phone number, or click resend text if you didn’t
              recieve it.
            </Text>
            <Button
              mode="warning"
              onPress={() => login()}
              title="Resend Text"
              style={styles.WarningButton}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  SectionStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '80%',
    marginTop: 20,
  },
  inputStyle: {
    color: 'black',
    borderColor: '#c8c8d3',
  },
  labelText: {
    marginLeft: 10,
    marginBottom: 15,
  },
  KeyboardView: {
    width: '100%',
    display: 'flex',
  },
  Button: {
    alignSelf: 'center',
    marginTop: 50,
    marginLeft: 10,
  },
  ContentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    bottom: 40,
  },
  descriptionText: {
    marginTop: 20,
    marginLeft: 10,
  },
  lockLogo: {
    marginBottom: 20,
    marginLeft: 10,
  },
  errorText: {
    margin: 0,
    marginTop: 25,
    marginBottom: 5,
    fontFamily: 'WorkSans-Regular',
  },
  WarningButton: {
    marginTop: 30,
    marginLeft: 10,
  },
});
