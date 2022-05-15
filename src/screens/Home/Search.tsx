import { Button, Text } from '@rneui/themed';
import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Dropdown, SelectCountry } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { AppColorPalette, commonStyles } from 'src/config/styles';

const windowHeight = Dimensions.get('window').height;

const ingredientsDropdown = [
  {
    value: true,
    lable: "I dont have any ingredients",
  },
  {
    value: false,
    lable: "I currently have ingredients",
  },
];

const dietPreference = [
  {
    value: 'Vegan',
    lable: "Vegan",
  },
  {
    value: "Keto",
    lable: "Keto",
  },
  {
    value: "Something else",
    lable: "Something else",
  },
];

const whatDayData = [
  {
    value: 'Monday',
    lable: "Monday",
  },
  {
    value: "Tuesday",
    lable: "Tuesday",
  },
  {
    value: "Wednesday",
    lable: "Wednesday",
  },
  {
    value: "Thursday",
    lable: "Thursday",
  },
  {
    value: "Friday",
    lable: "Friday",
  },
  {
    value: "Saturday",
    lable: "Saturday",
  },
  {
    value: "Sunday",
    lable: "Sunday",
  },
];

const whatTimeData = [
  {
    value: "9AM-11AM",
    lable: "9AM-11AM",
  },
  {
    value: "11AM-1PM",
    lable: "11AM-1PM",
  },
  {
    value: "1PM-3PM",
    lable: "1PM-3PM",
  },
  {
    value: "3PM-5PM",
    lable: "3PM-5PM",
  },
  {
    value: "7PM-9PM",
    lable: "7PM-9PM",
  },
  {
    value: "11PM-1AM",
    lable: "11PM-1AM",
  },
];

const howManyGuests = [
  {
    value: "1-3",
    lable: "1-3 People",
  },
  {
    value: "3-6",
    lable: "3-6 People",
  },
  {
    value: "6-10",
    lable: "6-10 People",
  },
  {
    value: "10+",
    lable: "10+ People",
  },
];

const Search = () => {
  const [hasIngredients, setHasIngredients] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.PageContainer}>
      <View style={styles.textContainer}>
        <Text type="large-header" style={commonStyles.mx10} centerText>Lets get you scheduled for a private chef!</Text>
        <Text style={commonStyles.mt20} type="description">Fill out the information below, and we will show you a list of chefs available at your request!</Text>
      </View>
      <View style={styles.dropdownsContainer}>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={styles.dropdown}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextProps={{ style: styles.placeholderStyle }}
            iconStyle={styles.iconStyle}
            maxHeight={115}
            data={ingredientsDropdown}
            iconColor="white"
            valueField="value"
            labelField="lable"
            dropdownPosition="bottom"
            placeholder="Do You Have Ingredients?"
            onChange={e => {
              setHasIngredients(e.value);
            }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, { maxWidth: 250 }]}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextProps={{ style: styles.placeholderStyle }}
            iconStyle={styles.iconStyle}
            maxHeight={115}
            dropdownPosition="bottom"
            data={dietPreference}
            iconColor="white"
            valueField="value"
            labelField="lable"
            placeholder="Diet Preference?"
            onChange={e => {
              setHasIngredients(e.value);
            }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, { maxWidth: 250 }]}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextProps={{ style: styles.placeholderStyle }}
            iconStyle={styles.iconStyle}
            maxHeight={115}
            data={whatDayData}
            iconColor="white"
            valueField="value"
            labelField="lable"
            placeholder="What Day?"
            onChange={e => {
              setHasIngredients(e.value);
            }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, { maxWidth: 250 }]}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextProps={{ style: styles.placeholderStyle }}
            iconStyle={styles.iconStyle}
            maxHeight={115}
            data={whatTimeData}
            iconColor="white"
            valueField="value"
            dropdownPosition="bottom"
            labelField="lable"
            placeholder="What Time?"
            onChange={e => {
              setHasIngredients(e.value);
            }}
          />
        </View>
        <View style={styles.dropdownContainer}>
          <Dropdown
            style={[styles.dropdown, { maxWidth: 300 }]}
            selectedTextStyle={styles.selectedTextStyle}
            placeholderStyle={styles.placeholderStyle}
            selectedTextProps={{ style: styles.placeholderStyle }}
            iconStyle={styles.iconStyle}
            maxHeight={115}
            data={howManyGuests}
            iconColor="white"
            valueField="value"
            dropdownPosition="bottom"
            labelField="lable"
            placeholder="How Many Guests?"
            onChange={e => {
              setHasIngredients(e.value);
            }}
          />
        </View>
      </View>
      <View style={styles.buttonView}>
        <Button style={styles.button} title="Submit" />
      </View>
    </ScrollView>

  );
};

export default Search


const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: AppColorPalette.orange,
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  placeholderStyle: {
    left: 15,
    fontWeight: '600',
    color: 'white',
    fontSize: windowHeight < 750 ? 16 : 18,
    fontFamily: 'WorkSans-Regular',
  },
  selectedTextStyle: {
    left: 15,
    fontWeight: '400',
    color: 'black',
    fontSize: windowHeight < 750 ? 16 : 18,
    fontFamily: 'WorkSans-Regular',
  },
  textContainer: {
    width: "80%",
    marginLeft: 20,
    marginTop: 30,
  },
  iconStyle: {
    width: 20,
    height: 20,
    right: 15
  },
  PageContainer: {
    minHeight: '80%',
  },
  dropdownContainer: {
  },
  dropdownsContainer: {
    marginTop: 20,
    width: "90%",
  },
  button: {

  },
  buttonView: {
    alignSelf: 'center',
    marginTop: windowHeight < 750 ? 50 : 50,
    paddingBottom: 30,

  },
});