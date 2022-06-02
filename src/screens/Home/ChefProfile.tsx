import {StyleSheet, View} from 'react-native';
import React from 'react';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {
  HomeNavigationRoutes,
  HomeRouteNames,
} from 'src/navigation/NavigationTypes';
import Tacos from '@assets/tacos.jpg';
import Ravioli from '@assets/pasta.jpg';
import t from 'tailwind';
import {Icon, Image, Text} from '@rneui/themed';
import ChefPhoto from '@assets/chef.jpg';
import ChefPhoto2 from '@assets/chef2.jpg';
import ChefPhoto3 from '@assets/chef3.jpg';
import ChefPhoto4 from '@assets/chef4.jpg';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';

const feedList = {
  'Chef Kakashi': {
    photo: ChefPhoto,
    rating: 5,
    school: 'SF Cullinary',
  },
  'Chef Mariano': {
    photo: ChefPhoto2,
    rating: 4,
    school: 'CIA at Greystone',
  },
  'Chef Juan Carlo': {
    photo: ChefPhoto3,
    rating: 5,
    school: 'Oregon State Cullinary',
  },
  'Chef Deshawn Williams': {
    photo: ChefPhoto4,
    rating: 5,
    school: 'CIA at Copia',
  },
};

const data = [
  {
    title: 'Gormet Mexican Food',
    menuId: 1,
    description:
      'Wide range of traditional Mexican food, from tacos to Enchiladas, my personal favorites learned from Mexico.',
    costPerGuest: 75,
    image: Tacos,
  },
  {
    title: 'Specialty Italian',
    menuId: 2,
    description:
      'Fantastic Ravioli with garlic herb butter (can be substituted if needed), with a glass of wine on the side. Garlic bread sticks included',
    costPerGuest: 80,
    image: Ravioli,
  },
];

export default function ChefProfile() {
  const route =
    useRoute<RouteProp<HomeNavigationRoutes, HomeRouteNames['CHEF_PROFILE']>>();
  const {chefName} = route.params;
  const schoolName = feedList[chefName].school;
  const navigation = useNavigation();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={t`col-center-start`}>
      <View style={t`row-center-center mt-5 w-full`}>
        <View style={t`col-center-center w-5/12`}>
          <Text type="header" centerText>
            {chefName}
          </Text>
          <Text type="description" centerText style={t`mt-1 mb-2`}>
            {schoolName}
          </Text>
          <View style={t`mb-2 row-center-center`}>
            {[...Array(5).keys()].map(() => (
              <Icon
                type="font-awesome"
                name="star"
                size={15}
                iconStyle={t`text-orange`}
              />
            ))}
          </View>
          <Text type="info" centerText>
            300 Jobs Completed
          </Text>
        </View>
        <View style={t`ml-5 w-5/12`}>
          <Image
            style={t`h-36 w-36 rounded-full`}
            source={feedList[chefName].photo}
          />
        </View>
      </View>
      <View style={t`col-center-center bg-white p-5 mt-5`}>
        <Text type="info">
          After graduating from {schoolName}, I worked with a large number of
          chefs in the Bay Area. I learned my specialty dishes working in a
          Chicago kitchen with my mentor, and have refined my craft over many
          years to develop a taste and number of dishes I know you and your
          guests will love. One of the key ....{' '}
          <Text type="info" style={t`font-bold`}>
            Read More
          </Text>
        </Text>
      </View>
      <Text type="header" style={t`self-start ml-5 mt-5`}>
        Menus:
      </Text>
      <View style={t`mt-5 w-full mb-5`}>
        {data.map(item => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('CHEF_MENU_DETAIL', {menuItem: item.title})
            }
            style={t`row-center-between bg-white w-full mb-2`}>
            <View style={t`col-start-start ml-5 w-3/6`}>
              <Text
                type="description"
                style={t`text-orange mb-2 font-semibold`}>
                {item.title}
              </Text>
              <View style={t`flex-row w-full`}>
                <Text numberOfLines={1} style={t`mb-2 flex-1`}>
                  {item.description}
                </Text>
              </View>
              <Text>${item.costPerGuest}/guest</Text>
            </View>
            <View />
            <View>
              <Image source={item.image} style={t`h-25 w-25`} />
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
}
