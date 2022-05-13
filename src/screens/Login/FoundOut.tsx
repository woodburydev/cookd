import React, { useContext, useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { AppColorPalette, commonStyles } from '@config/styles';
import { Button, CheckBox, Text } from '@rneui/themed';
import axios from 'axios';
import { endpoint } from '@config/api';
import { UserContext } from 'src/context/UserContext';
import { useNavigation } from '@react-navigation/core';

export default function FoundOut() {
    const [foundOut, setFoundOut] = useState<number[]>([]);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();

    const checkBoxPressed = (item: number) => {
        if (foundOut.includes(item)) {
            setFoundOut(foundOut.filter(curItem => item !== curItem));
        } else {
            setFoundOut([...foundOut, item]);
        }
    };

    const submit = () => {
        setLoading(true);
        const foundOutList = getRadioButtonsData()
            .filter(item => foundOut.includes(item.id))
            .map(item => item.label.toLowerCase());

        navigation.navigate('ALLERGIES', { foundOut: foundOutList })
        setLoading(false);
    };

    return (
        <View style={[commonStyles.FlexColCenterCenter, styles.contentContainer]}>
            <View style={[styles.SectionStyle]}>
                <Text style={styles.labelText} type="header">
                    How'd you hear about us?
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
                            checked={foundOut.includes(item.id)}
                        />
                    ))}
                </View>
            </View>
            <Button
                onPress={submit}
                style={styles.Button}
                title={
                    loading ? <ActivityIndicator color="white" /> : 'NEXT'
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
            label: 'A Friend',
        },
        {
            id: 2,
            label: 'Google Ad',
        },
        {
            id: 3,
            label: 'Youtube Ad',
        },
        {
            id: 4,
            label: 'Our Blog',
        },
        {
            id: 5,
            label: 'Billboard',
        },
        {
            id: 6,
            label: 'News',
        },
        {
            id: 7,
            label: 'Other',
        },
    ];
}
