import React, { useContext } from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { HomeRoutes } from './Home/routes';
import { Icon, Image, Text } from '@rneui/themed';
import { ProfileRoutes } from './Profile/routes';
import ProfilePicture from '@assets/profilePicture.jpg';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import { ProfileNavigationRoutes, ProfileRouteNames } from './NavigationTypes';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AirbnbRating, Button } from '@rneui/base';
import { UserContext } from 'src/context/UserContext';
import Header from 'src/screens/Login/Components/Header';
import { useNavigation } from '@react-navigation/core';

export const LoginNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

export const HomeNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

export const ProfileNavigationOptions = (
  props: StackNavigationProp<ProfileNavigationRoutes, keyof ProfileRouteNames>,
): StackNavigationOptions => {
  const { user } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const routeName = props.route.name as keyof ProfileRouteNames;
  const displayName = ProfileRoutes[routeName]?.displayName;

  if (props.route.name === HomeRoutes.PROFILE.name) {
    return {
      headerShown: true,
      header: () => (
        <SafeAreaView style={[commonStyles.FlexColCenterCenter, styles.header]} >
          <Icon color={AppColorPalette.orange} style={styles.notificationIcon} containerStyle={[styles.notificationIconContainer, { top: insets.bottom > 30 ? 56 : 45, right: insets.bottom > 30 ? 25 : 40 }]} type="material" name="notification-important" />
          <View style={[commonStyles.FlexRowCenterCenter, styles.HeaderWrapper, { marginTop: insets.bottom > 30 ? "7%" : '0%' }]}>
            <View>
              <Image
                source={ProfilePicture}
                style={styles.image}
                containerStyle={styles.imageContainer}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={[styles.headerContentContainer]}>
              <Text type="label" style={[styles.headerText, { flex: 1, marginTop: 30 }]} numberOfLines={1}>
                {user?.displayname}
              </Text>
            </View>
          </View>
        </SafeAreaView>
      ),
    };
  } else {
    return {
      headerShown: true,
      headerStyle: commonStyles.WhiteHeaderBackground,
      header: (headerProps) => {
        return (
          <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
            <Header backArrow headerText={displayName} onPressBack={() => navigation.navigate('PROFILE')} />
          </SafeAreaView>
        )
      }
    }
  }
};

const styles = StyleSheet.create({
  header: {
    height: 150,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    position: 'relative',
    shadowRadius: 3,
  },
  HeaderWrapper: {
    width: "100%",
  },
  image: {
    height: 80,
    width: 80,
  },
  notificationIconContainer: {
    width: 50,
    height: 50,
    position: 'absolute',
    paddingLeft: 30,
  },
  notificationIcon: {
    top: 5,
    color: 'orange',
  },
  imageContainer: {
    borderRadius: 50,
    marginRight: 15,
  },
  headerText: {
    width: '90%',
  },
  headerContentContainer: {
    margin: 0,
    width: "60%",
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  button: {
  }
});
