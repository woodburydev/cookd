import { Icon, Image, Text } from '@rneui/themed/dist';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { AppColorPalette, commonStyles } from 'src/config/styles';
import { ScrollView } from 'react-native-gesture-handler';
import Chef from '@assets/chef.jpg';
import Chef1 from '@assets/chef2.jpg';
import Chef2 from '@assets/chef4.jpg';

export default function FavoriteChefs() {
  return (
    <ScrollView>
      <View style={commonStyles.FlexColCenterStart}>
        <View style={[commonStyles.FlexColCenterStart, commonStyles.mt30]}>
          <View style={styles.WhiteBackgroundView}>
            <View>
              <Image source={Chef} style={styles.ChefImage} />
            </View>
            <View style={styles.WhiteBackgroundTextContainer}>
              <View>
                <Text style={styles.ChefName}>Chef Kakashi</Text>
                <Text>SF Cullinary</Text>
              </View>
              <View style={styles.WhiteBackgroundTextBottom}>
                <Text style={[commonStyles.mb5, styles.CuisineName]}>Mexican Cuisine</Text>
                <View style={styles.StarIcons}>
                  {[...Array(5).keys()].map(() => (
                    <Icon
                      type="font-awesome"
                      name="star"
                      size={11}
                      iconStyle={styles.RatingIcon}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
          <View style={[commonStyles.mt20, styles.WhiteBackgroundView]}>
            <View>
              <Image source={Chef1} style={styles.ChefImage} />
            </View>
            <View style={styles.WhiteBackgroundTextContainer}>
              <View>
                <Text style={styles.ChefName}>Chef Mariano</Text>
                <Text>CIA at Greystone</Text>
              </View>
              <View style={styles.WhiteBackgroundTextBottom}>
                <Text style={[commonStyles.mb5, styles.CuisineName]}>Itialian Cuisine</Text>
                <View style={styles.StarIcons}>
                  {[...Array(5).keys()].map(() => (
                    <Icon
                      type="font-awesome"
                      name="star"
                      size={11}
                      iconStyle={styles.RatingIcon}
                    />
                  ))}
                </View>
              </View>
            </View>
          </View>
          <View style={[commonStyles.mt20, styles.WhiteBackgroundView]}>
            <View>
              <Image source={Chef2} style={styles.ChefImage} />
            </View>
            <View style={styles.WhiteBackgroundTextContainer}>
              <View>
                <Text style={styles.ChefName}>Chef Dehshawn Williams</Text>
                <Text>CIA at Copia</Text>
              </View>
              <View style={styles.WhiteBackgroundTextBottom}>
                <Text style={[commonStyles.mb5, styles.CuisineName]}>American Cuisine</Text>
                <View style={styles.StarIcons}>
                  {[...Array(5).keys()].map(() => (
                    <Icon
                      type="font-awesome"
                      name="star"
                      size={11}
                      iconStyle={styles.RatingIcon}
                    />
                  ))}
                </View>
              </View>
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
    padding: 20,
    height: 145,
    flexDirection: 'row',
  },
  WhiteBackgroundTextContainer: {
    height: '100%',
    marginLeft: 20,
    justifyContent: 'center'
  },
  WhiteBackgroundTextBottom: {
    marginTop: 25
  },
  StarIcons: {
    flexDirection: 'row'
  },
  ChefName: {
    fontWeight: '600',
  },
  CuisineName: {
    fontWeight: '300',
    fontSize: 12,
  },
  ChefImage: {
    width: 100,
    height: 100,
    borderRadius: 100
  },
  RatingIcon: {
    color: AppColorPalette.orange,
  },
})