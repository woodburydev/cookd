import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  KeyboardAvoidingView,
  StyleSheet,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {Text, Input, Button} from '@rneui/themed';
import {commonStyles} from '@config/styles';
import {LoginRoutes} from '@navigation/Login/routes';
import axios from 'axios';
import {endpoint} from 'src/config/api';
import {useNavigation} from '@react-navigation/core';
import {LoginRoutesNames} from 'src/navigation/NavigationTypes';
import Header from './Components/Header';

const countryCode = '+1';

export default function Signup() {
  const navigation = useNavigation();
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const [emailErrorText, setEmailErrorText] = useState('');
  const [phoneErrorText, setPhoneErrorText] = useState('');
  const [firstNameErrorText, setFirstNameErrorText] = useState('');
  const [lastNameErrorText, setLastNameErrorText] = useState('');
  const [loading, setLoading] = useState(false);
  const [notInDB, setNotInDB] = useState(false); // reserved for user who FULLY registed, but didnt get into database -> proceed to later screens
  // override with any, typescript is stupid and unncecessary
  const lastNameRef: any = useRef<HTMLDivElement>(null);
  const emailRef: any = useRef<HTMLDivElement>(null);
  const phoneRef: any = useRef<HTMLDivElement>(null);

  const sentOTP = useCallback(async () => {
    await auth()
      .signInWithPhoneNumber(countryCode + userPhoneNumber)
      .then(res => {
        setConfirm(res);
      })
      .catch(err => {
        console.log(err);
        if (err.code === 'auth/invalid-phone-number') {
          setPhoneErrorText('Please enter a valid phone number');
        }
        setLoading(false);
      });
  }, [userPhoneNumber]);

  const submit = (finalSubmit: boolean) => {
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (firstName.length <= 1) {
      return finalSubmit
        ? setFirstNameErrorText('Please enter a longer first name')
        : false;
    } else if (lastName.length <= 1) {
      return finalSubmit
        ? setLastNameErrorText('Please enter a longer last name')
        : false;
    } else if (!emailRegex.test(email)) {
      return finalSubmit
        ? setEmailErrorText('Please enter a valid email')
        : false;
    } else if (userPhoneNumber.length !== 10) {
      return finalSubmit
        ? setPhoneErrorText('Please enter a valid phone number')
        : false;
    } else {
      return finalSubmit ? confirmDetails() : true;
    }
  };

  const confirmDetails = useCallback(async () => {
    setLoading(true);
    await axios
      .post(`${endpoint}/user/canCreate`, {
        firstname: firstName,
        lastname: lastName,
        email: email,
        phone: `${countryCode}${userPhoneNumber}`,
      })
      .then(res => {
        if (res.data.status) {
          sentOTP();
        } else {
          const reason = res.data.reason;
          if (reason === 'invalid-email') {
            setEmailErrorText('This email is already in use!');
          }
          if (reason === 'invalid-number') {
            setPhoneErrorText('This phone number is already in use!');
          }
          if (reason === 'not-in-db') {
            setNotInDB(true);
            sentOTP();
          }
          setLoading(false);
        }
      })
      .catch(err => {
        console.log(err);
        setPhoneErrorText('Please enter a valid phone number');
        setLoading(false);
      });
  }, [email, firstName, lastName, userPhoneNumber, sentOTP]);

  useEffect(() => {
    if (confirm) {
      const userInformation = {
        firstName,
        lastName,
        email,
        phone: `${countryCode}${userPhoneNumber}`,
      };
      setLoading(false);
      navigation.navigate(
        LoginRoutes.ENTER_OTP.name as LoginRoutesNames['ENTER_OTP'],
        {
          confirm,
          sign_up: {
            userInformation,
            notInDB,
          },
        },
      );
    }
  }, [
    confirm,
    confirmDetails,
    email,
    firstName,
    lastName,
    navigation,
    userPhoneNumber,
    notInDB,
  ]);

  // const mobilevalidate = (inputString: string) => {
  //   const reg = /^[0]?[789]\d{9}$/;
  //   if (reg.test(inputString) === false) {
  //     return false;
  //   } else {
  //     Keyboard.dismiss();
  //     return true;
  //   }
  // };

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
        keyboardVerticalOffset={windowHeight < 700 ? -100 : -200}>
        <Header
          loading="20%"
          upArrow
          downArrow={submit(false) ? true : false}
          onPressDown={() => confirmDetails()}
          onPressUp={() =>
            navigation.navigate(
              LoginRoutes.GET_STARTED.name as LoginRoutesNames['GET_STARTED'],
            )
          }
        />
        <View style={styles.ContentContainer}>
          <View style={styles.SectionStyle}>
            <Text type="label" style={styles.labelText}>
              First Name
            </Text>
            <Input
              shake={() => {}}
              style={styles.inputStyle}
              onChangeText={name => {
                setFirstName(name);
                setFirstNameErrorText('');
              }}
              autoCapitalize="words"
              maxLength={20}
              errorMessage={firstNameErrorText}
              returnKeyType="next"
              onSubmitEditing={() =>
                lastNameRef.current && lastNameRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Text type="label" style={styles.labelText}>
              Last Name
            </Text>
            <Input
              shake={() => {}}
              style={styles.inputStyle}
              maxLength={20}
              onChangeText={name => {
                setLastName(name);
                setLastNameErrorText('');
              }}
              autoCapitalize="words"
              ref={lastNameRef}
              returnKeyType="next"
              errorMessage={lastNameErrorText}
              onSubmitEditing={() =>
                emailRef.current && emailRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Text type="label" style={styles.labelText}>
              Email
            </Text>
            <Input
              shake={() => {}}
              style={styles.inputStyle}
              ref={emailRef}
              maxLength={40}
              onChangeText={UserEmail => {
                setEmail(UserEmail);
                setEmailErrorText('');
              }}
              autoCapitalize="none"
              keyboardType="email-address"
              returnKeyType="next"
              onSubmitEditing={() =>
                phoneRef.current && phoneRef.current.focus()
              }
              blurOnSubmit={false}
              errorMessage={emailErrorText}
            />
          </View>
          <View style={styles.SectionStyle}>
            <Text type="label" style={styles.labelText}>
              Phone Number
            </Text>
            <Input
              shake={() => {}}
              onSubmitEditing={() => submit(true)}
              ref={phoneRef}
              onChangeText={number => {
                setUserPhoneNumber(number);
                setPhoneErrorText('');
              }}
              maxLength={10}
              keyboardType="number-pad"
              errorMessage={phoneErrorText}
            />
          </View>
          <Button
            onPress={() => (loading ? undefined : submit(true))}
            title={
              loading ? (
                <ActivityIndicator color="#F8EFA0" />
              ) : (
                'VERIFY WITH TEXT'
              )
            }
            style={styles.Button}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
  },
  SectionStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '80%',
    marginTop: windowHeight < 700 ? 0 : 10,
  },
  inputStyle: {
    color: 'black',
  },
  registerTextStyle: {
    textAlign: 'center',
    fontSize: 14,
    alignSelf: 'center',
  },
  labelText: {
    marginLeft: 10,
  },
  KeyboardView: {
    width: '100%',
    display: 'flex',
  },
  Button: {
    alignSelf: 'center',
    marginTop: windowHeight < 700 ? 0 : 30,
  },
  ContentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
    bottom: windowHeight < 700 ? 0 : 20,
  },
  errorText: {
    margin: 0,
    marginTop: 20,
    marginBottom: windowHeight < 700 ? 10 : 5,
    fontSize: 16,
    fontFamily: 'WorkSans-Regular',
    fontWeight: '600',
  },
});
