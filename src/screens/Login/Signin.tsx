import {Image} from '@rneui/themed/dist/Image';
import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import CookdLogo from '@assets/cookdlogolabel.png';
import {commonStyles} from 'src/config/styles';
import {Button, Input, Text} from '@rneui/themed';
import {LoginRoutes} from 'src/navigation/Login/routes';
import {Link, useNavigation} from '@react-navigation/native';
import {LoginRoutesNames} from 'src/navigation/NavigationTypes';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

const countryCode = '+1';

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [phoneErrorText, setPhoneErrorText] = useState('');
  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult>();
  const navigation = useNavigation();

  const sendOTP = useCallback(async () => {
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

  useEffect(() => {
    if (confirm) {
      setLoading(false);
      navigation.navigate(
        LoginRoutes.ENTER_OTP.name as LoginRoutesNames['ENTER_OTP'],
        {
          confirm,
          sign_up: undefined,
        },
      );
    }
  }, [confirm, navigation]);

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={commonStyles.FlexColCenterCenter}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={-250}
        style={styles.KeyboardView}>
        <View style={styles.ContentContainer}>
          <View style={commonStyles.FlexColCenterCenter}>
            <Image
              source={CookdLogo}
              style={styles.logoContainer}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={styles.SectionStyle}>
              <Text style={styles.labelText} type="label">
                Phone Number
              </Text>
              <Input
                shake={() => {}}
                // onSubmitEditing={() => submit(true)}
                onChangeText={number => {
                  setUserPhoneNumber(number);
                  setPhoneErrorText('');
                }}
                maxLength={10}
                keyboardType="number-pad"
                errorMessage={phoneErrorText}
              />
              <Button
                onPress={() => {
                  sendOTP();
                }}
                title={
                  loading ? <ActivityIndicator color="#F8EFA0" /> : 'LOGIN'
                }
              />

              <Link
                to={{
                  screen: LoginRoutes.SIGN_UP
                    .name as LoginRoutesNames['SIGN_UP'],
                }}
                style={styles.linkStyle}>
                Dont have an account?
              </Link>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  logoContainer: {
    marginTop: 50,
    marginBottom: 10,
    padding: 0,
    height: 110,
    width: 150,
  },
  SectionStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    width: '80%',
    marginTop: windowHeight < 700 ? 0 : 10,
  },
  KeyboardView: {
    width: '100%',
    display: 'flex',
  },
  ContentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    bottom: windowHeight < 700 ? 0 : 20,
  },
  linkStyle: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
  labelText: {
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
});
