import React, { useContext } from 'react';
import {
  StackNavigationOptions,
  StackNavigationProp,
} from '@react-navigation/stack';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { MainTabRoutes } from './Main/routes';
import { Icon, Image, Text } from '@rneui/themed';
import { ProfileRoutes } from './Profile/routes';
import ProfilePicture from '@assets/profilePicture.png';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import {
  ProfileNavigationRoutes,
  ProfileRouteNames,
  MessageRouteNames,
  MessageNavigationRoutes,
  HomeRouteNames,
  HomeNavigationRoutes,
} from './NavigationTypes';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AirbnbRating, Button } from '@rneui/base';
import { UserContext } from 'src/context/UserContext';
import Header from 'src/screens/Login/Components/Header';
import { useNavigation } from '@react-navigation/core';
import { MessageRoutes } from './Messages/routes';
import { HomeRoutes } from './Home/routes';

export const LoginNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

export const MainNavigationOptions: StackNavigationOptions = {
  headerShown: false,
};

export const HomeNavigationOptions = (
  props: StackNavigationProp<HomeNavigationRoutes, keyof HomeRouteNames>,
): StackNavigationOptions => {
  const navigation = useNavigation();
  const routeName = props.route.name as keyof HomeRouteNames;
  const { chefName } = props.route?.params || '';
  const displayName = HomeRoutes[routeName]?.displayName;
  if (routeName !== HomeRoutes['HOME'].name) {
    return {
      headerShown: true,
      headerStyle: commonStyles.WhiteHeaderBackground,
      header: headerProps => {
        return (
          <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
            <Header backArrow onPressBack={() => navigation.goBack()} />
          </SafeAreaView>
        );
      },
    };
  }
  return {
    headerShown: true,
    headerStyle: commonStyles.WhiteHeaderBackground,
    header: headerProps => {
      return (
        <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
          <Header />
        </SafeAreaView>
      );
    },
  };
};

export const MessageNavigationOptions = (
  props: StackNavigationProp<MessageNavigationRoutes, keyof MessageRouteNames>,
): StackNavigationOptions => {
  const navigation = useNavigation();
  const routeName = props.route.name as keyof MessageRouteNames;
  const { recipientDisplayName } = props.route?.params || '';
  const displayName = MessageRoutes[routeName]?.displayName;
  if (routeName === MessageRoutes['MESSAGE_DETAIL'].name) {
    return {
      headerShown: true,
      headerStyle: commonStyles.WhiteHeaderBackground,
      header: headerProps => {
        return (
          <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
            <Header
              backArrow
              onPressBack={() => navigation.navigate('MESSAGE')}
              headerText={recipientDisplayName}
            />
          </SafeAreaView>
        );
      },
    };
  }
  return {
    headerShown: true,
    headerStyle: commonStyles.WhiteHeaderBackground,
    header: headerProps => {
      return (
        <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
          <Header headerText={displayName} />
        </SafeAreaView>
      );
    },
  };
};

export const ProfileNavigationOptions = (
  props: StackNavigationProp<ProfileNavigationRoutes, keyof ProfileRouteNames>,
): StackNavigationOptions => {
  const { user, profilePicture } = useContext(UserContext);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const routeName = props.route.name as keyof ProfileRouteNames;
  const displayName = ProfileRoutes[routeName]?.displayName;

  if (props.route.name === MainTabRoutes.PROFILE.name) {
    return {
      headerShown: true,
      header: () => (
        <SafeAreaView style={[commonStyles.FlexColCenterCenter, styles.header]}>
          <Icon
            color={AppColorPalette.orange}
            style={styles.notificationIcon}
            containerStyle={[
              styles.notificationIconContainer,
              {
                top: insets.bottom > 30 ? 56 : 45,
                right: insets.bottom > 30 ? 25 : 40,
              },
            ]}
            type="material"
            name="notification-important"
          />
          <View
            style={[
              commonStyles.FlexRowCenterCenter,
              styles.HeaderWrapper,
              { marginTop: insets.bottom > 30 ? '7%' : '0%' },
            ]}
          >
            <View>
              <Image
                source={profilePicture?.linkToProfilePicture ? { uri: profilePicture?.linkToProfilePicture } : ProfilePicture}
                style={styles.image}
                containerStyle={styles.imageContainer}
                PlaceholderContent={<ActivityIndicator />}
              />
            </View>
            <View style={[styles.headerContentContainer]}>
              <Text
                type="label"
                style={[styles.headerText, { flex: 1, marginTop: 30 }]}
                numberOfLines={1}
              >
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
      header: headerProps => {
        return (
          <SafeAreaView style={commonStyles.WhiteHeaderBackground}>
            <Header
              backArrow
              headerText={displayName}
              onPressBack={() => navigation.navigate('PROFILE')}
            />
          </SafeAreaView>
        );
      },
    };
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
    width: '100%',
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
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
  },
  button: {},
});
