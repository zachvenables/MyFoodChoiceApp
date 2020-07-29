import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import { checkBoxes } from './Styles';

export default function OSUCheckbox ({ option, isSelected, setSelection}) {
    return (
        <View style = {checkBoxes.container}>
            <CheckBox
                value={isSelected}
                onValueChange={setSelection}
                
            />
            <Text style = {checkBoxes.text}>{option}</Text>
        </View>
    );
}
