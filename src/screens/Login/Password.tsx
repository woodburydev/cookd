import {Icon} from '@rneui/base';
import {Button, Input, Text} from '@rneui/themed';
import React, {useRef, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {commonStyles} from '@config/styles';
import {LoginRoutes} from '@navigation/Login/routes';
import auth from '@react-native-firebase/auth';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/core';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';
import Header from './Components/Header';

export default function SetPassword() {
  const [errorText, setErrorText] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const confirmPasswordRef: any = useRef<HTMLDivElement>(null);
  const navigation = useNavigation();
  const route =
    useRoute<
      RouteProp<LoginNavigationRoutes, LoginRoutesNames['SET_PASSWORD']>
    >();

  const email = route.params?.email;
  const submitPassword = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      setErrorText('Password’s don’t match!');
      setLoading(false);
    } else {
      // validate password
      const credential = auth.EmailAuthProvider.credential(email, password);
      // do handling, so that if a user cannot link a credential because it is already linked, this is ok!
      try {
        auth()
          .currentUser!.linkWithCredential(credential)
          .then(() => {
            navigation.navigate(
              LoginRoutes.ALLERGIES.name as LoginRoutesNames['ALLERGIES'],
            );
          })
          .catch(err => {
            console.log(err);
            if (err.code === 'auth/weak-password') {
              setErrorText('Please choose a stronger password.');
            } else if (err.code === 'auth/requires-recent-login') {
              setErrorText('Please re-authenticate.');
              navigation.navigate(
                LoginRoutes.SIGN_UP.name as LoginRoutesNames['SIGN_UP'],
              );
            } else {
              setErrorText('Oops, there was a problem');
            }
            setLoading(false);
          });
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    }
  };

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
        <Header loading="60%" />
        <View style={styles.ContentContainer}>
          <Icon
            type="material-community"
            name="shield-lock-outline"
            containerStyle={styles.lockIconContainer}
            style={styles.lockLogo}
            size={30}
          />
          <View style={styles.SectionStyle}>
            <Text style={styles.labelText} type="label">
              Set a Password
            </Text>
            <Input
              shake={() => {}}
              style={styles.inputStyle}
              textContentType="newPassword"
              secureTextEntry
              maxLength={40}
              onChangeText={input => {
                setPassword(input);
                setErrorText('');
              }}
              placeholderTextColor="#8b9cb5"
              onSubmitEditing={() =>
                confirmPasswordRef.current && confirmPasswordRef.current.focus()
              }
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Text style={styles.labelText} type="label">
              Confirm Password
            </Text>
            <Input
              shake={() => {}}
              style={styles.inputStyle}
              ref={confirmPasswordRef}
              textContentType="newPassword"
              secureTextEntry
              maxLength={40}
              onChangeText={input => setConfirmPassword(input)}
              placeholderTextColor="#8b9cb5"
              errorMessage={errorText}
              onSubmitEditing={() => submitPassword()}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <Button
            onPress={submitPassword}
            title={
              loading ? (
                <ActivityIndicator color="#1C0000" />
              ) : (
                'SELECT ALLERGENS'
              )
            }
            style={styles.Button}
          />
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
    marginBottom: 10,
  },
  KeyboardView: {
    width: '100%',
    display: 'flex',
  },
  Button: {
    alignSelf: 'center',
    marginTop: 50,
  },
  ContentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '80%',
    bottom: 40,
  },
  lockLogo: {
    marginBottom: 20,
    marginLeft: 50,
  },
  errorText: {
    margin: 0,
    marginTop: 20,
  },
  WarningButton: {
    marginTop: 30,
    marginLeft: 10,
  },
  checkLogo: {
    marginLeft: 5,
  },
  lockIconContainer: {
    alignSelf: 'flex-start',
  },
});
