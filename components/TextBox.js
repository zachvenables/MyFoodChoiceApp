import React from 'react';
import { TextInput, Text, View, } from 'react-native'

import { textBoxes } from './Styles';

//Stateless stylized textbox and text above
export default function OSUTextBox ({ prompt, keyboardType, onChangeText}) {
    return (
        <View style = {textBoxes.container}>
            <View style = {textBoxes.promptContainer}>
                <Text style={textBoxes.promptText}>{prompt}</Text>
            </View>
            <View style = {textBoxes.textBoxContainer}>
                <TextInput 
                style = {textBoxes.textBox}
                keyboardType = {keyboardType}
                onChangeText = {onChangeText}
                />
            </View>
            
        </View>
    );
}