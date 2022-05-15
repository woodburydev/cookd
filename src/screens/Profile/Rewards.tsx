import { Image } from '@rneui/themed/dist/Image';
import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import RewardsImage from '@assets/rewardsImage.png';
import { Text } from '@rneui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { Icon } from '@rneui/base';
import { LinearProgress } from '@rneui/themed/dist/LinearProgress';

export default function Rewards() {
  return (
    <View style={[commonStyles.FlexColCenterCenter, { flex: 1 }]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[commonStyles.FlexColCenterStart, styles.scrollView]}>
        <View style={[commonStyles.FlexColCenterStart, styles.upperContentContainer]}>
          <Image
            source={RewardsImage}
            style={styles.logoContainer}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Text type="label" centerText style={styles.text}>
            25% Off When Your Meter Is Full
        </Text>
          <Text style={{ fontWeight: '500' }} centerText>
            Every eight points earns 25% Off
        </Text>
          <View style={[styles.progressContainer, commonStyles.mt20]}>
            <LinearProgress
              variant="determinate"
              style={[styles.progressBarStyle, commonStyles.mt10]}
              value={0.25}
              animation={false}
              color={AppColorPalette.orange}
            />
          </View>
        </View>
        <View style={[styles.howToEarnBlock]}>
          <View style={[styles.howToEarnText]}>
            <Text type="label">How to earn rewards:</Text>
            <Text style={commonStyles.mx10}>
              There are two ways to earn rewards with Cookd.
            </Text>
            <Text style={commonStyles.mx10}>

              1: Order a service from one of our many
              expeienced chefs for two or more guests.
          </Text>
            <Text style={commonStyles.mx10}>

              2: Refer Cookd to a friend or family member
              and when they use our service for the first
              time you recieve a reward point.
          </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  upperContentContainer: {
    width: '70%',
    marginTop: 30
  },
  howToEarnText: {
  },
  logoContainer: {
    height: 150,
    marginBottom: 50,
    width: 150,
  },
  howToEarnBlock: {
    marginTop: 30,
    padding: 30,
    backgroundColor: 'white',
    width: "100%",
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginTop: 10,
    marginBottom: 10,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: AppColorPalette.orange,
  },
  scrollView: {
    paddingBottom: 20,
    width: "100%"
  },
  progressContainer: {
    flexDirection: 'row',
  },
  progressIndividualIconStyle: {
    margin: 0,
    padding: 0,
  },
  progressBarStyle: {
    height: 20,
  }
});
