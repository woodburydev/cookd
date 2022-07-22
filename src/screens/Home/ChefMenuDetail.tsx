import {View} from 'react-native';
import React, {useState} from 'react';
import Tacos from '@assets/tacos.jpg';
import Ravioli from '@assets/pasta.jpg';
import t from 'tailwind';
import {Button, CheckBox, Image, Text} from '@rneui/themed';
import {ScreenWidth} from '@rneui/base';
import {RouteProp, useRoute} from '@react-navigation/native';
import {
  HomeNavigationRoutes,
  HomeRouteNames,
} from 'src/navigation/NavigationTypes';
import {AppColorPalette} from 'src/config/styles';
import {ScrollView} from 'react-native-gesture-handler';
const data = {
  'Gormet Mexican Food': {
    menuId: 1,
    description:
      'Wide range of traditional Mexican food, from tacos to Enchiladas, my personal favorites learned from Mexico.',
    costPerGuest: 75,
    entrees: [
      {
        title: 'Tacos',
        description:
          'My favorite tacos I learned how to make in Mexico. These is always my favorite crowd pleasing dish.',
      },
      {
        title: 'Enchiladas',
        description:
          'My favorite enchiladas I learned how to make in Mexico. These taste absolutely fantastic and are some of my customers favorite dish.',
      },
    ],
    sides: [
      {
        title: 'Garlic Bread',
      },
    ],
    image: Tacos,
  },
  'Specialty Italian': {
    menuId: 2,
    description:
      'Fantastic Ravioli with garlic herb butter (can be substituted if needed). Garlic bread sticks included',
    entrees: [
      {
        title: 'Ravioli with garlic herb butter',
        description:
          'My personal favorite, this ravioli was a dish learned from italy, and has been passed down from some of the highest respected chefs. Non dairy editions can be added if needed.',
      },
    ],
    sides: [
      {
        title: 'Garlic Bread',
      },
    ],
    costPerGuest: 80,
    image: Ravioli,
  },
};

export default function ChefMenuDetail() {
  const route =
    useRoute<
      RouteProp<HomeNavigationRoutes, HomeRouteNames['CHEF_MENU_DETAIL']>
    >();
  const {menuItem} = route.params;
  const [checked, setChecked] = useState<any>({});
  const [checkedSides, setCheckedSides] = useState<any>({});
  console.log(checked);
  const item = data[menuItem];
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={t`col-center-start`}
    >
      <Image
        style={[{width: ScreenWidth}, t`h-28 rounded-b-2xl`]}
        source={item.image}
      />
      <View style={t`row-center-between w-5/6 mt-5`}>
        <Text type="large-header" style={t`text-orange`}>
          Menu {item.menuId}
        </Text>
        <View />
        <Text type="label" style={t`text-orange`}>
          ${item.costPerGuest}/guest
        </Text>
      </View>
      <View style={t`mt-5 w-5/6 col-start-start`}>
        <Text type="description" style={t`font-semibold`}>
          {menuItem}
        </Text>
        <Text style={t`mt-2`} type="description">
          {item.description}
        </Text>
      </View>
      <View style={t`mt-10 w-5/6 row-center-start`}>
        <Text type="header">Entrees</Text>
        <Text type="info" style={t`ml-5 text-red`}>
          1 Included Per Person
        </Text>
      </View>
      <View style={t`mt-3`}>
        {item.entrees.map((entree, index) => (
          <View style={t`p-5 mt-2 row-center-start bg-white w-full`}>
            <View style={t`w-5/6`}>
              <Text style={t`font-semibold`}>{entree.title}</Text>
              <Text style={t`mt-2`}>{entree.description}</Text>
            </View>
            <CheckBox
              checked={checked[index]}
              checkedColor={AppColorPalette.orange}
              onPress={() =>
                setChecked({
                  ...checked,
                  [index]: !checked[index],
                })
              }
              center
            />
          </View>
        ))}
      </View>
      <View style={t`mt-10 w-5/6 row-center-start`}>
        <Text type="header">Sides</Text>
        <Text type="info" style={t`ml-5 text-red`}>
          1 Included Per Person
        </Text>
      </View>
      <View style={t`mt-3`}>
        {item.sides.map((entree, index) => (
          <View style={t`py-1 px-5 mt-2 row-center-start bg-white w-full`}>
            <View style={t`w-5/6`}>
              <Text style={t`font-semibold`}>{entree.title}</Text>
            </View>
            <CheckBox
              checked={checkedSides[index]}
              checkedColor={AppColorPalette.orange}
              onPress={() =>
                setCheckedSides({
                  ...checkedSides,
                  [index]: !checkedSides[index],
                })
              }
              center
            />
          </View>
        ))}
      </View>
      <View style={t`my-10`}>
        <Button title="Finalize Order" />
      </View>
    </ScrollView>
  );
}
