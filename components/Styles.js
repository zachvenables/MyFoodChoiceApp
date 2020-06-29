import {StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import { colors } from 'react-native-elements';

const buttons = StyleSheet.create({
    container: {
        paddingHorizontal: 50,
        paddingVertical: 2
    },
    button: {
        backgroundColor: Colors.tOSUscarlet,
        borderRadius: 10,
        paddingHorizontal: 10, 
        paddingVertical: 15
    },
    text: {
        color: Colors.tOSUwhite,
        textTransform: 'uppercase',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }
}),

promptTexts = StyleSheet.create({
    promptContainer: {
        paddingTop: 50,
        paddingLeft: 10,
        paddingBottom: 2
    },
    promptText: {
        color: Colors.tOSUblack,
        fontSize: 24,
        fontWeight: 'bold'
    },
}),

textBoxes = StyleSheet.create({
    container: {
        paddingHorizontal: 20
    },
    promptContainer: promptTexts.promptContainer,
    promptText: promptTexts.promptText,
    textBoxContainer: {
        paddingBottom: 10
    },
    textBox: {
        height: 40,
        borderColor: Colors.tOSUgray,
        borderWidth: 2,
        borderRadius: 5
    },
});



export { buttons, textBoxes, promptTexts }