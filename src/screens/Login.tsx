import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import auth from '@react-native-firebase/auth';

export default function Login() {
  const [otpSent, setOtpSent] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState<any>();
  const [userOTP, setUserOTP] = useState<any>();
  const [confirm, setConfirm] = useState<any>(null);

  const countryCode = '+1';

  console.log(userPhoneNumber);
  const sentOTP = async () => {
    const confirmation = await auth().signInWithPhoneNumber(
      countryCode + userPhoneNumber,
    );
    setConfirm(confirmation);
    setOtpSent(true);
  };

  const login = async () => {
    try {
      await confirm.confirm(userOTP);
    } catch (error) {
      console.log('Invalid code.');
    }
  };
  return (
    <View>
      {!otpSent ? (
        <>
          <Text>Enter Number Below to Send an OTP</Text>
          <TextInput
            placeholder="Enter Number"
            value={userPhoneNumber}
            onChangeText={setUserPhoneNumber}
          />
          <TouchableOpacity onPress={sentOTP} style={styles.button}>
            <Text style={styles.text}>Enter</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text>Enter OTP That Has Been Sent To Your Phone</Text>
          <TextInput
            placeholder="Enter OTP To Login"
            value={userOTP}
            onChangeText={setUserOTP}
          />
          <TouchableOpacity onPress={login} style={styles.button}>
            <Text style={styles.text}>Enter</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

export const styles = StyleSheet.create({
  button: {
    padding: 10,
    backgroundColor: 'blue',
  },
  text: {
    color: 'white',
  },
});
