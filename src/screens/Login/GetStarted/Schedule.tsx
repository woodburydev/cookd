import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import React, { useContext, useState } from 'react'
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { endpoint } from 'src/config/api';
import { LoginNavigationRoutes, LoginRoutesNames } from 'src/navigation/NavigationTypes';
import { RouteProp, useRoute } from '@react-navigation/core';
import { UserContext } from 'src/context/UserContext';
import { commonStyles } from 'src/config/styles';
import ChefImage from '@assets/GetStartedImages/Chef3.png';
import { Button, Image, Text } from '@rneui/themed';

export default function Schedule() {
  const route =
    useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['SCHEDULE']>>();
  const { allergies, foundOut, cuisines } = route.params;
  const { getUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
const submit = () => {
    setLoading(true);

    const user = auth().currentUser!;
    axios
      .post(`${endpoint}/user`, {
        displayname: user!.displayName,
        fbuuid: user!.uid,
        email: user!.email,
        phone: user!.phoneNumber,
        foundOut,
        allergies,
        cuisines,
      })
      .then(() => {
        getUser!(user);
      })
      .catch(err => {
        console.log('Error saving user in database: ', err);
        setLoading(false);
      });
  };
  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <View style={[styles.SectionStyle]}>
        <Image
          source={ChefImage}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={[styles.TextContainer]}>
          <Text type="large-header" style={[commonStyles.mb20]}centerText>Step 3: Schedule</Text>
          <Text type="description" centerText>Pick your time, place, number of guests and any special requests. </Text>
          <Text type="description" centerText style={commonStyles.mt10}>Feel free to message the chef before-hand for any questions.</Text>
        </View>
        <Button
          onPress={submit}
          style={styles.Button}
          title={
            loading ? <ActivityIndicator color="white" /> : 'Finish'
          }
        />
        <Text onPress={submit} style={[styles.LinkText]}>skip</Text>
      </View>
    </View>
  )
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    width: '90%',
    marginTop: "5%",
    top: windowHeight < 750 ? 30 : 0,
    justifyContent: 'space-between',
    height: windowHeight < 750 ? "75%" : '65%',
    alignItems: 'center',
    padding: 20,
  },
  TextContainer: {
    width: '80%',
  },
  logoContainer: {
    height: windowHeight < 750 ? 150 : 200,
    alignSelf: 'center',
    width: windowHeight < 750 ? 150 : 200,
  },
  Button: {
    alignSelf: 'center',
  },
  LinkText: {
    textDecorationLine: 'underline',
    bottom: 10,
  }
});