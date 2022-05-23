import React, { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { AppColorPalette, commonStyles } from '@config/styles';
import { Button, CheckBox, Text } from '@rneui/themed';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { endpoint } from '@config/api';
import { UserContext } from 'src/context/UserContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';

export default function Cuisines() {
  const [selectedCuisines, setSelectedCuisines] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const route =
    useRoute<RouteProp<LoginNavigationRoutes, LoginRoutesNames['CUISINES']>>();
  const { allergies, foundOut } = route.params;
  const navigation = useNavigation();
  const { getUser } = useContext(UserContext);

  const checkBoxPressed = (item: number) => {
    if (selectedCuisines.includes(item)) {
      setSelectedCuisines(selectedCuisines.filter(curItem => item !== curItem));
    } else {
      setSelectedCuisines([...selectedCuisines, item]);
    }
  };

  const submit = () => {
    setLoading(true);
    const cuisines = getRadioButtonsData()
      .filter(item => selectedCuisines.includes(item.id))
      .map(item => item.label.toLowerCase());
    navigation.navigate('BROWSE', { allergies, cuisines, foundOut})
    };

  return (
    <View style={[commonStyles.FlexColCenterCenter, styles.contentContainer]}>
      <View style={[styles.SectionStyle]}>
        <Text style={styles.labelText} type="header">
          Favorite Cuisines?
        </Text>
        <Text style={styles.descriptionText} type="info">
          Check any that peak your interest!
        </Text>
        <View style={styles.ListContainer}>
          {getRadioButtonsData().map(item => (
            <CheckBox
              center
              key={item.id}
              title={item.label}
              checkedColor={AppColorPalette.orange}
              containerStyle={styles.CheckboxContainerStyle}
              onPress={() => checkBoxPressed(item.id)}
              textStyle={styles.CheckboxStyle}
              checkedIcon="check-circle-o"
              uncheckedIcon="circle-o"
              checked={selectedCuisines.includes(item.id)}
            />
          ))}
        </View>
      </View>
      <Button
        onPress={submit}
        style={styles.Button}
        title={
          loading ? <ActivityIndicator color="white" /> : 'Start Browsing Chefs'
        }
      />
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    width: '80%',
  },
  contentContainer: {
    marginTop: '15%',
  },
  Button: {
    marginTop: windowHeight < 700 ? 0 : 20,
    alignSelf: 'center',
  },
  labelText: {
    marginLeft: 10,
    marginBottom: 10,
  },
  descriptionText: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  CheckboxContainerStyle: {
    backgroundColor: AppColorPalette.appBackgroundColor,
    padding: 0,
    margin: windowHeight < 750 ? 4 : windowHeight < 850 ? 7 : 8,
  },
  CheckboxStyle: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'WorkSans-Regular',
    color: 'black',
  },
  ListContainer: {
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
  },
});

function getRadioButtonsData() {
  return [
    {
      id: 1, // acts as primary key, should be unique and non-empty string
      label: 'Thai',
    },
    {
      id: 2,
      label: 'Italian',
    },
    {
      id: 3,
      label: 'Indian',
    },
    {
      id: 4,
      label: 'Mexican',
    },
    {
      id: 5,
      label: 'Japanese',
    },
    {
      id: 6,
      label: 'American',
    },
    {
      id: 7,
      label: 'Mediterannian',
    },
    {
      id: 8,
      label: 'African',
    },
    {
      id: 9,
      label: 'French',
    },
  ];
}
