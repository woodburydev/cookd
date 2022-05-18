import React, { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions, KeyboardAvoidingView } from 'react-native';
import { AppColorPalette, commonStyles } from '@config/styles';
import { Button, CheckBox, Input, Text } from '@rneui/themed';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import { endpoint } from '@config/api';
import { UserContext } from 'src/context/UserContext';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/core';
import {
  LoginNavigationRoutes,
  LoginRoutesNames,
} from 'src/navigation/NavigationTypes';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';

const screenWidth = Dimensions.get('window').width;

export default function FavoriteCuisines() {
  const [selectedCuisines, setSelectedCuisines] = useState<number[]>([]);
  const user = useContext(UserContext).user!;

  const checkBoxPressed = (item: number) => {
    if (selectedCuisines.includes(item)) {
      setSelectedCuisines(selectedCuisines.filter(curItem => item !== curItem));
    } else {
      setSelectedCuisines([...selectedCuisines, item]);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexDirection: 'column', justifyContent: 'center', minHeight: '100%' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        keyboardVerticalOffset={100}
        behavior={"position"}
        contentContainerStyle={{ width: screenWidth, alignItems: 'center' }}
      >
        <View style={[{ marginTop: 25, width: '100%', justifyContent: 'center', alignItems: 'center' }]}>
          <View style={styles.topContainer}>
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
                  containerStyle={styles.CheckboxContainerStyle}
                  onPress={() => checkBoxPressed(item.id)}
                  textStyle={styles.CheckboxStyle}
                  checkedIcon="check-circle-o"
                  checkedColor={AppColorPalette.orange}
                  uncheckedIcon="circle-o"
                  checked={selectedCuisines.includes(item.id) || user.cuisines.includes(item.label.toLowerCase())}
                />
              ))}
            </View>
            <View style={{ paddingBottom: 25 }} >
              <Text type="label" style={[styles.labelText, commonStyles.mt20]}>Other</Text>
              <Input shake={() => null} />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    width: '100%',
  },
  topContainer: {
    width: '80%',
    top: windowHeight < 750 ? 10 : 0,
    justifyContent: 'center',
    minHeight: '100%',
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
