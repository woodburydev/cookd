import {Text} from '@rneui/themed';
import React, {useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {commonStyles} from 'src/config/styles';
import {UserContext} from 'src/context/UserContext';

export default function Profile() {
  const user = useContext(UserContext).user!;
  return (
    <View style={commonStyles.FlexColCenterStart}>
      <View style={[commonStyles.FlexColCenterCenter, styles.header]}>
        <Text type="label" style={styles.headerText}>
          {user.displayname}
        </Text>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  contentContainer: {
    width: '70%',
    marginTop: 75,
  },
  header: {
    flex: 0,
    height: '20%',
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerText: {
    marginTop: '12.5%',
  },
  logoContainer: {
    height: 150,
    marginBottom: 50,
    width: 250,
  },
});
