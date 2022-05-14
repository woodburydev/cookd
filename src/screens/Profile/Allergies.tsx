import React, { useContext, useState } from 'react';
import { View, StyleSheet, Dimensions, KeyboardAvoidingView } from 'react-native';
import { AppColorPalette, commonStyles } from '@config/styles';
import { CheckBox, Input, Text } from '@rneui/themed';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { UserContext } from 'src/context/UserContext';

const screenWidth = Dimensions.get('window').width;

export default function Allergies() {
  const [otherAllergies] = useState('');
  const user = useContext(UserContext).user!;
  const [selectedAllergies, setSelectedAllergies] = useState<number[]>([]);
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
  };

  return (
    <View style={[commonStyles.FlexColCenterCenter, { flex: 1 }]}>
      <KeyboardAwareScrollView contentContainerStyle={{ width: screenWidth, alignItems: 'center' }}>
        <View style={styles.topContainer}>
          <Text style={styles.labelText} type="header">
            Allergies?
        </Text>
          <Text style={styles.descriptionText} type="info">
            Check any allergies that apply. This list can be edited per event
            as-well.
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
                checked={selectedAllergies.includes(item.id) || user.allergies.includes(item.value)}
              />
            ))}
          </View>
          <View style={{ paddingBottom: 25 }}>
            <Text type="label" style={[styles.labelText, commonStyles.mt20]}>Other</Text>
            <Input shake={() => null} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  SectionStyle: {
    width: '75%',
    justifyContent: 'space-evenly',
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
  topContainer: {
    width: '80%',
    marginTop: 25
  },
  CheckboxContainerStyle: {
    backgroundColor: AppColorPalette.appBackgroundColor,
    padding: 0,
    margin: windowHeight < 750 ? 5 : windowHeight < 850 ? 7 : 10,
  },
  CheckboxStyle: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'WorkSans-Regular',
    color: 'black',
  },
  ListContainer: {
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 20,
    marginBottom: 20,
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
    {
      id: 7,
      label: 'Wheat',
      value: 'wheat',
    },
  ];
}
