import React from 'react';
import { Text, View} from 'react-native'

import { promptTexts } from './Styles';

export default function OSUPrompt ({ prompt}) {
    return (
        <View style = {promptTexts.promptContainer}>
            <Text style = {promptTexts.promptText}>{prompt}</Text>
        </View>
    );
}