import {Icon, Image} from '@rneui/themed';
import React from 'react';
import {View, StyleSheet, ActivityIndicator, Animated} from 'react-native';
import CookdLogo from 'src/assets/cookdlogo.png';

export default function Header({
  loading,
  onPressUp,
  onPressDown,
  upArrow,
  downArrow,
}: {
  loading: string;
  onPressUp?: () => any;
  onPressDown?: () => any;
  upArrow?: boolean;
  downArrow?: boolean;
}) {
  const styles = StyleSheet.create({
    HeaderContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '20%',
      width: '100%',
    },
    logoContainer: {
      height: 75,
      width: 75,
    },
    loadingBar: {
      backgroundColor: '#F26430',
      height: 20,
      width: loading,
      alignSelf: 'flex-start',
    },
    iconsContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '80%',
      flexDirection: 'row',
      marginTop: 45,
    },
    upArrow: {
      display: upArrow ? undefined : 'none',
    },
    downArrow: {
      display: downArrow ? undefined : 'none',
    },
    paddingView: {
      width: 25,
    },
  });

  return (
    <Animated.View style={[styles.HeaderContainer]}>
      <View />
      <View style={styles.iconsContainer}>
        {upArrow ? (
          <Icon
            type="material-icons"
            name="arrow-upward"
            onPress={onPressUp}
            style={styles.upArrow}
            // style={styles.lockLogo}
            size={25}
          />
        ) : (
          <View style={styles.paddingView} />
        )}

        <Image
          source={CookdLogo}
          style={styles.logoContainer}
          PlaceholderContent={<ActivityIndicator />}
        />
        {downArrow ? (
          <Icon
            type="material-icons"
            name="arrow-downward"
            onPress={onPressDown}
            style={styles.downArrow}
            size={25}
          />
        ) : (
          <View style={styles.paddingView} />
        )}
      </View>

      <View style={styles.loadingBar} />
    </Animated.View>
  );
}
