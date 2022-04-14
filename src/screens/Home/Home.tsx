import React from 'react';
import {View} from 'react-native';
import auth from '@react-native-firebase/auth';
import {commonStyles} from 'src/config/styles';
import {Button} from '@rneui/themed';

export default function Home() {
  return (
    <View style={commonStyles.FlexColCenterCenter}>
      <Button title="SIGN OUT" onPress={() => auth().signOut()} />
    </View>
  );
}
