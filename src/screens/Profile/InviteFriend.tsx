import { Text, Input, Button } from '@rneui/themed';
import React from 'react';
import { Dimensions, KeyboardAvoidingView, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { commonStyles } from 'src/config/styles';

const screenWidth = Dimensions.get('window').width;

export default function InviteFriend() {
  return (
    <View style={[commonStyles.FlexColCenterCenter]}>
      <KeyboardAwareScrollView contentContainerStyle={[commonStyles.FlexColCenterCenter, { width: screenWidth }]} extraScrollHeight={50}>
        <KeyboardAvoidingView style={commonStyles.FlexColCenterCenter}>
          <View style={styles.contentContainer}>
            <Text style={commonStyles.mb30} type="label">Email or Phone Number</Text>
            <Text style={commonStyles.mb30} type="description">Inviting a friend can give you a point towards your reward of 25% off once they use the service for the first time.</Text>
            <Input shake={() => null} placeholder="(xxx) xxx-xxxx or xxxxxxx@xxxx.xxx" />
          </View>
          <Button title="Submit" />
        </KeyboardAvoidingView>
      </KeyboardAwareScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  contentContainer: {
    width: "80%",
    alignItems: 'center',
    justifyContent: 'center'
  },
  screenContentContainer: {
    // AVOID DOING THIS BELOW, if the screen grows past 100% on any device were screwed.
  }
})