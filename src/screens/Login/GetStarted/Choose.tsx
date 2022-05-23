import { Button, Image, Text } from '@rneui/themed';
import React, { useContext, useState } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LoginNavigationRoutes, LoginRoutesNames } from 'src/navigation/NavigationTypes';
import { commonStyles } from 'src/config/styles';
import ChefImage from '@assets/GetStartedImages/Chef2.png';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import { endpoint } from 'src/config/api';
import { UserContext } from 'src/context/UserContext';

export default function Choose() {
  const route =
    useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['CHOOSE']>>();
  const navigation = useNavigation();
  const { allergies, cuisines, foundOut } = route.params;
  const { getUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    navigation.navigate('SCHEDULE', { allergies, foundOut, cuisines })
  }

  const submitToDB = () => {
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
        <View style={[styles.TextContainer, commonStyles.mb20]}>
          <Text type="large-header" style={[commonStyles.mb20, commonStyles.mt10]}centerText>Step 2: Choose</Text>
          <Text type="description" style={commonStyles.mb10} centerText>After finding a Chef you have two options:</Text>
          <Text type="description" centerText>1. Choose one of thier signature menu offerings.</Text>
          <Text type="description" centerText style={commonStyles.mt10}>2. Request your Chef to use your own ingredients.</Text>
        </View>
        <Button
          onPress={submit}
          style={styles.Button}
          title={ loading ? <ActivityIndicator /> : 'Next'}
        />
        <Text onPress={submitToDB} style={[styles.LinkText, commonStyles.mt10]}>skip</Text>
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
  }
});