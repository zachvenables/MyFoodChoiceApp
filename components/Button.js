import * as React from 'react';
import { TouchableOpacity, Text, View } from 'react-native'

import { buttons } from './Styles';

//A stateless stylized button in a view
export default function OSUButton ({ title, onPress, submit = false}) {
    return (
        <View style = {buttons.container}>
            <TouchableOpacity
                    style = {submit ? buttons.submitButton:buttons.button}
                    onPress = {onPress}
                >
                <Text style = {buttons.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
}