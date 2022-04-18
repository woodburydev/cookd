import React, {useState} from 'react';
import {View, KeyboardAvoidingView, StyleSheet, Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {commonStyles, DEFAULT_APP_COLOR} from '@config/styles';
import {Button, CheckBox, Input, Text} from '@rneui/themed';
import {LoginRoutes} from '@navigation/Login/routes';
import {useNavigation} from '@react-navigation/core';
import {LoginRoutesNames} from 'src/navigation/NavigationTypes';
import Header from './Components/Header';

export default function Allergies() {
  const [otherAllergies, setOtherAllergies] = useState('');
  const [selectedAllergies, setSelectedAllergies] = useState<number[]>([]);
  const navigation = useNavigation();
  const checkBoxPressed = (item: number) => {
    if (selectedAllergies.includes(item)) {
      setSelectedAllergies(
        selectedAllergies.filter(curItem => item !== curItem),
      );
    } else {
      setSelectedAllergies([...selectedAllergies, item]);
    }
  };

  const getAllergies = () => {
    const values = getRadioButtonsData()
      .filter(item => selectedAllergies.includes(item.id))
      .map(item => item.value);
    values.push(otherAllergies);
    return values;
  };

  const submit = () => {
    const allergies = getAllergies();
    navigation.navigate(
      LoginRoutes.CUISINES.name as LoginRoutesNames['CUISINES'],
      {allergies},
    );
  };

  return (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[
        commonStyles.FlexColCenterStart,
        commonStyles.FlexGrow,
      ]}>
      <KeyboardAvoidingView
        behavior="position"
        style={styles.KeyboardView}
        keyboardVerticalOffset={-100}>
        <Header
          loading="80%"
          downArrow
          onPressDown={() => {
            const allergies = getAllergies();
            navigation.navigate(
              LoginRoutes.CUISINES.name as LoginRoutesNames['CUISINES'],
              {allergies},
            );
          }}
        />
        <View style={styles.ContentContainer}>
          <View style={[styles.SectionStyle, styles.TopContent]}>
            <Text style={styles.labelText} type="header">
              Allergies?
            </Text>
            <Text style={styles.descriptionText} type="info">
              Check all that apply. This list can be edited per event as-well.
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
                  uncheckedIcon="circle-o"
                  checked={selectedAllergies.includes(item.id)}
                />
              ))}
            </View>
          </View>
          <View style={styles.SectionStyle}>
            <Text
              style={[styles.labelText, styles.otherLabelText]}
              type="label">
              Other
            </Text>
            <Input
              shake={() => {}}
              style={styles.inputStyle}
              onChangeText={input => setOtherAllergies(input)}
              // errorMessage={errorText}
              maxLength={40}
              onSubmitEditing={() => submit()}
              underlineColorAndroid="#f000"
              blurOnSubmit={false}
            />
          </View>
          <Button
            onPress={submit}
            title="FAVORITE CUISINES"
            style={styles.Button}
          />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const windowHeight = Dimensions.get('window').height;

export const styles = StyleSheet.create({
  KeyboardView: {
    width: '100%',
    display: 'flex',
  },
  ContentContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '80%',
    bottom: windowHeight < 700 ? 0 : 40,
  },
  SectionStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'center',
    width: '80%',
    marginTop: windowHeight < 700 ? 10 : 20,
  },
  Button: {
    marginTop: windowHeight < 700 ? 0 : 20,
    marginBottom: windowHeight < 700 ? 20 : 0,
    alignSelf: 'center',
  },
  inputStyle: {
    color: 'black',
    borderColor: '#c8c8d3',
  },
  labelText: {
    marginLeft: 10,
    marginBottom: 10,
  },
  errorText: {
    margin: 0,
    marginTop: 20,
  },
  descriptionText: {
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
  },
  CheckboxContainerStyle: {
    backgroundColor: DEFAULT_APP_COLOR,
    padding: 0,
    margin: windowHeight < 700 ? 0 : 5,
  },
  CheckboxStyle: {
    fontSize: windowHeight < 700 ? 12 : 13,
    fontWeight: '600',
    fontFamily: 'WorkSans-Regular',
    color: 'black',
  },
  ListContainer: {
    alignItems: 'flex-start',
    marginTop: windowHeight < 700 ? 0 : 20,
    marginBottom: windowHeight < 700 ? 0 : 20,
  },
  TopContent: {},
  otherLabelText: {
    top: windowHeight < 700 ? 20 : 0,
  },
});

function getRadioButtonsData() {
  return [
    {
      id: 1, // acts as primary key, should be unique and non-empty string
      label: 'Soy',
      value: 'soy',
    },
    {
      id: 2,
      label: 'Milk',
      value: 'milk',
    },
    {
      id: 3,
      label: 'Eggs',
      value: 'eggs',
    },
    {
      id: 4,
      label: 'Peanuts',
      value: 'peanuts',
    },
    {
      id: 5,
      label: 'Shellfish (such as shrimp)',
      value: 'shellfish',
    },
    {
      id: 6,
      label: 'Tree Nuts (walnuts, cashew etc.)',
      value: 'tree-nuts',
    },
  ];
}
