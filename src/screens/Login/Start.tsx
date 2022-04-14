import {Button, Image, Text} from '@rneui/themed';
import React from 'react';
import {View, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {commonStyles} from '@config/styles';
import CookingImage from '@assets/cookingimage.jpeg';
import CookdLogo from '@assets/cookdlogolabel.png';
import {LoginRoutes} from 'src/navigation/Login/routes';
import {useNavigation} from '@react-navigation/core';
import {LoginRoutesNames} from 'src/navigation/NavigationTypes';
import {Link} from '@react-navigation/native';

export default function GetStarted() {
  const navigation = useNavigation();

  return (
    <View style={commonStyles.FlexColCenterStart}>
      <Image
        source={CookingImage}
        style={styles.imageContainer}
        PlaceholderContent={<ActivityIndicator />}
      />
      <View style={[commonStyles.FlexColCenterStart, styles.mainBodyContainer]}>
        <Image
          source={CookdLogo}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />
        <View style={styles.textDivider}>
          <Text style={styles.mainText} type="header">
            Bringing Fine{' '}
            <Text style={[styles.mainText, commonStyles.Underline]}>
              Dining Home
            </Text>
          </Text>
        </View>

        <View style={styles.textDivider}>
          <Text style={[styles.subText]} type="description">
            Welcome to Cookd! Let's set up your profile in 30 seconds.
          </Text>
        </View>
        <Button
          onPress={() =>
            navigation.navigate(
              LoginRoutes.SIGN_UP.name as LoginRoutesNames['SIGN_UP'],
            )
          }
          title="GET STARTED"
          style={styles.button}
        />
        <Link
          to={{screen: LoginRoutes.SIGN_IN.name as LoginRoutesNames['SIGN_IN']}}
          style={styles.linkStyle}>
          Already have an account?
        </Link>
      </View>
    </View>
  );
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  imageContainer: {
    height: windowHeight / 2,
    width: windowWidth,
    resizeMode: 'cover',
    zIndex: -1,
  },
  mainBodyContainer: {
    height: windowHeight < 700 ? '80%' : '60%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    zIndex: 1,
    position: 'absolute',
    backgroundColor: 'white',
    bottom: 0,
  },
  logoContainer: {
    marginTop: 50,
    marginBottom: 10,
    padding: 0,
    height: 110,
    width: 150,
  },
  mainText: {
    fontSize: 28,
    fontWeight: '600',
    textAlign: 'center',
  },
  subText: {
    textAlign: 'center',
  },
  textDivider: {
    marginTop: 20,
    width: '60%',
  },
  button: {
    marginTop: 50,
  },
  linkStyle: {
    marginTop: 20,
    textDecorationLine: 'underline',
  },
});
