import React, { useState } from 'react';
import { CheckBox, Text, StyleSheet, View } from 'react-native';

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
