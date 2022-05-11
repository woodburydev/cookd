import { Image, Text, Icon } from '@rneui/themed';

import React, { useContext } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { commonStyles, AppColorPalette } from 'src/config/styles';
import logo from '@assets/cookdlogo.png';
import { UserContext } from '@context/UserContext';
import ChefPhoto from '@assets/chef.jpg';
import DishPhoto from '@assets/sushi.jpg';
import CuisinePhoto from '@assets/japan.jpg';
import ChefPhoto2 from '@assets/chef2.jpg';
import ItalyPhoto from '@assets/italy.jpg';
import Pasta from '@assets/pasta.jpg';
import ChefPhoto3 from '@assets/chef3.jpg';
import Mexico from '@assets/mexico.jpg';
import Tacos from '@assets/tacos.jpg';
import ChefPhoto4 from '@assets/chef4.jpg';
import Chicago from '@assets/chicago.jpg';
import Burger from '@assets/burger.jpg';

export default function Home({ }) {
  const { user } = useContext(UserContext);
  const feedList = [
    {
      photo: ChefPhoto,
      name: 'Chef Kakashi',
      cuisine: { photo: CuisinePhoto, name: 'Japanese Cuisine' },
      rating: 5,
      cost: 150,
      dish: { photo: DishPhoto, name: 'Samurai Sushi' },
    },
    {
      photo: ChefPhoto2,
      name: 'Chef Boyardee',
      cuisine: { photo: ItalyPhoto, name: 'Italian Cuisine' },
      rating: 4,
      cost: 125,
      dish: { photo: Pasta, name: 'Creamy Pesto Bowtie' },
    },
    {
      photo: ChefPhoto3,
      name: 'Chef Juan Carlo',
      cuisine: { photo: Mexico, name: 'Mexican Cuisine' },
      rating: 5,
      cost: 125,
      dish: { photo: Tacos, name: 'Fresco Street Tacos' },
    },
    {
      photo: ChefPhoto4,
      name: 'Chef Deshawn Williams',
      cuisine: { photo: Chicago, name: 'American Cuisine' },
      rating: 5,
      cost: 75,
      dish: { photo: Burger, name: 'Juicy Double Buffalo Burger' },
    },
  ];
  return (
    // eslint-disable-next-line react-native/no-inline-styles
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={commonStyles.FlexColCenterStart} showsVerticalScrollIndicator={false}>
        <View style={[commonStyles.FlexColCenterCenter, styles.header]}>
          <Image source={logo} style={styles.logoContainer} />
        </View>
        <View style={[commonStyles.FlexColStartStart, styles.contentContainer]}>
          <Text type="info" style={styles.welcomeText}>
            {`What's looking good today ${user?.displayname}?`}
          </Text>
          <View style={[commonStyles.FlexColStartStart, styles.feedContainer]}>
            <View style={styles.feedHeader}>
              <Text type="header">Trending Chefs</Text>
            </View>
            <ScrollView showsHorizontalScrollIndicator={false} style={styles.feedCarousel} horizontal={true}>
              {feedList.map((item, index) => (
                <View
                  style={[
                    commonStyles.FlexColCenterCenter,
                    styles.feedItemWrapper,
                  ]}>
                  <View
                    style={[commonStyles.FlexColCenterCenter, styles.feedItem]}
                    key={index}>
                    <Image source={item.cuisine.photo} style={styles.MainImg} />
                    <View
                      style={[
                        commonStyles.FlexColCenterCenter,
                        styles.ChefAvitarWrapper,
                      ]}>
                      <View
                        style={[
                          commonStyles.FlexColCenterCenter,
                          styles.ChefAvitarContainer,
                        ]}>
                        <Image source={item.photo} style={styles.ChefAvitar} />
                      </View>
                    </View>

                    <View
                      style={[
                        commonStyles.FlexColCenterCenter,
                        styles.FeedItemContents,
                      ]}>
                      <Text type="info" style={styles.ChefName}>
                        {item.name}
                      </Text>
                      <Text type="info" style={styles.CuisineName}>
                        {item.cuisine.name}
                      </Text>
                      <View
                        style={[
                          commonStyles.FlexRowCenterBetween,
                          styles.DetailsBar,
                        ]}>
                        <Text
                          type="info"
                          style={styles.DetailsText}>{`$${item.cost}`}</Text>
                        <View style={styles.Ratings}>
                          {[...Array(item.rating - 1).keys()].map(() => (
                            <Icon
                              type="font-awesome"
                              name="star"
                              size={11}
                              iconStyle={styles.RatingIcon}
                            />
                          ))}
                          <Icon
                            type="font-awesome"
                            name="star"
                            size={11}
                            iconStyle={styles.RatingIcon}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
          <View style={[commonStyles.FlexColStartStart, styles.feedContainer]}>
            <View style={styles.feedHeader}>
              <Text type="header">Your Cuisines</Text>
            </View>
            <ScrollView style={styles.feedCarousel} horizontal={true}>
              {feedList.map((item, index) => (
                <View
                  style={[
                    commonStyles.FlexColCenterCenter,
                    styles.feedItemWrapper,
                  ]}>
                  <View
                    style={[commonStyles.FlexColCenterCenter, styles.feedItem]}
                    key={index}>
                    <Image source={item.dish.photo} style={styles.MainImg} />
                    <View
                      style={[
                        commonStyles.FlexColCenterCenter,
                        styles.ChefAvitarWrapper,
                      ]}>
                      <View
                        style={[
                          commonStyles.FlexColCenterCenter,
                          styles.ChefAvitarContainer,
                        ]}>
                        <Image source={item.photo} style={styles.ChefAvitar} />
                      </View>
                    </View>

                    <View
                      style={[
                        commonStyles.FlexColCenterCenter,
                        styles.FeedItemContents,
                      ]}>
                      <Text type="info" style={styles.ChefName}>
                        {`${item.name}'s`}
                      </Text>
                      <Text type="info" style={styles.CuisineName}>
                        {item.dish.name}
                      </Text>
                      <View
                        style={[
                          commonStyles.FlexRowCenterBetween,
                          styles.DetailsBar,
                        ]}>
                        <Text
                          type="info"
                          style={styles.DetailsText}>{`$${item.cost}`}</Text>
                        <View style={styles.Ratings}>
                          {[...Array(item.rating - 1).keys()].map(() => (
                            <Icon
                              type="font-awesome"
                              name="star"
                              size={11}
                              iconStyle={styles.RatingIcon}
                            />
                          ))}
                          <Icon
                            type="font-awesome"
                            name="star"
                            size={11}
                            iconStyle={styles.RatingIcon}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 100,
    backgroundColor: 'white',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    paddingTop: 30,
  },
  logoContainer: {
    height: 75,
    width: 75,
  },
  contentContainer: {
    width: '90%',
    marginTop: 20,
  },
  welcomeText: {
    color: AppColorPalette.orange,
    marginBottom: 10,
    fontSize: 18,
  },
  feedContainer: {
    height: 300,
    width: '100%',
    backgroundColor: 'transparent',
    marginBottom: 4,
  },
  feedHeader: {
    height: '15%',
    width: '100%',
    paddingTop: 5,
  },
  feedCarousel: {
    height: '85%',
    width: '100%',
    backgroundColor: 'transparent',
  },
  feedItemWrapper: {
    height: '90%',
    width: 200,
    backgroundColor: 'white',
    margin: 5,
    borderRadius: 10,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  feedItem: {
    height: '100%',
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  MainImg: {
    height: 122,
    width: 200,
  },
  FeedItemContents: {
    height: '50%',
    width: '100%',
    position: 'relative',
  },
  DetailsBar: {
    width: '100%',
    height: '30%',
    position: 'absolute',
    bottom: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  ChefAvitarWrapper: {
    height: 85,
    width: 85,
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 100,
  },
  ChefAvitarContainer: {
    height: 75,
    width: 75,
    backgroundColor: 'white',
    zIndex: 10,
    borderRadius: 100,
    overflow: 'hidden',
  },
  ChefAvitar: {
    height: 75,
    width: 75,
  },
  ChefName: {
    fontWeight: '600',
  },
  CuisineName: {
    fontWeight: '300',
    fontSize: 12,
  },
  DetailsText: {
    color: AppColorPalette.orange,
  },
  Ratings: {
    display: 'flex',
    flexDirection: 'row',
  },
  RatingIcon: {
    color: AppColorPalette.orange,
  },
});
