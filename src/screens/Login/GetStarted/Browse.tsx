import {Button, Text} from '@rneui/themed';
import React, {useContext, useState} from 'react';
import {ActivityIndicator, Dimensions, StyleSheet, View} from 'react-native';
import {commonStyles} from 'src/config/styles';
import auth from '@react-native-firebase/auth';
import ChefImage from '@assets/GetStartedImages/Chef1.png';
import {Image} from '@rneui/themed/dist/Image';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';
import {UserContext} from 'src/context/UserContext';
import axios from 'axios';
import {endpoint} from 'src/config/api';

export default function Browse() {
  const route =
    useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['BROWSE']>>();
  const navigation = useNavigation();
  const {getUser} = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const {allergies, foundOut, cuisines} = route.params;
  const submit = () => {
    navigation.navigate('CHOOSE', {allergies, foundOut, cuisines});
  };

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
        <Text type="large-header" centerText>
          Bringing Fine Dining Home in 3 Steps
        </Text>
        <Image
          source={ChefImage}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={[styles.TextContainer, commonStyles.mb20]}>
          <Text type="large-header" centerText>
            Step 1: Browse
          </Text>
          <Text style={commonStyles.mt20} type="description" centerText>
            Browse Certefied Cookd Chefs in your area.{' '}
          </Text>
        </View>
        <Button
          onPress={submit}
          style={styles.Button}
          title={loading ? <ActivityIndicator /> : 'Next'}
        />
        <Text onPress={submitToDB} style={[styles.LinkText, commonStyles.mt10]}>
          skip
        </Text>
      </View>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    width: '90%',
    marginTop: '5%',
    top: windowHeight < 750 ? 30 : 0,
    justifyContent: 'space-between',
    height: windowHeight < 750 ? '75%' : '65%',
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
  },
});
