import { Icon, Image, Text } from '@rneui/themed/dist';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import Visa from '@assets/visa.png'
import ApplePay from '@assets/applePay.png'
import Discover from '@assets/discover.png'
import { ScrollView } from 'react-native-gesture-handler';
export default function PaymentMethods() {
  return (
    <ScrollView>
      <View style={commonStyles.FlexColCenterStart}>
        <View style={[commonStyles.FlexColCenterStart, commonStyles.mt30]}>
          <View style={styles.WhiteBackgroundView}>
            <View>
              <Image source={Visa} style={styles.CardImageStyle} />
            </View>
            <View>
              <Text style={[commonStyles.mx5, styles.CardType]} type="label">Visa - Debit</Text>
              <Text>**** **** **** 5682</Text>
              <Text>11/25</Text>
            </View>
          </View>
          <View style={[styles.WhiteBackgroundView, commonStyles.mt10]}>
            <View>
              <Image source={Discover} style={[styles.CardImageStyle, { width: 70, marginLeft: 10, marginRight: 20 }]} />
            </View>
            <View>
              <Text style={[commonStyles.mx5, styles.CardType]} type="label">Discover - Credit</Text>
              <Text>**** **** **** 3532</Text>
              <Text>2/24</Text>
            </View>
          </View>
          <View style={[styles.WhiteBackgroundView, commonStyles.mt10]}>
            <View>
              <Image source={ApplePay} style={styles.CardImageStyle} />
            </View>
            <View>
              <Text style={[commonStyles.mx5, styles.CardType]} type="label">Apple Pay</Text>
            </View>
          </View>
          <View style={[styles.SmallWhiteBackgroundView, commonStyles.mt10]}>
            <View>
              <Icon style={styles.AddIconStyle} type="material" name="add" />
            </View>
            <View>
              <Text style={[commonStyles.mx5, styles.CardType]} type="label">Add New Payment Method</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  WhiteBackgroundView: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    height: 100
  },
  SmallWhiteBackgroundView: {
    backgroundColor: 'white',
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    height: 50
  },
  RemoveIconContainerStyle: {
    position: 'absolute',
    right: 20
  },
  CardType: {
    fontSize: 13,
  },
  CardImageStyle: {
    height: 50,
    width: 90,
    marginRight: 10,
  },
  AddIconStyle: {
    width: 90,
  }
})