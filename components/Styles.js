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
    submitButton: {
        backgroundColor: Colors.tOSUgray,
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
        paddingHorizontal: 50,
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
    promptContainer: {
        paddingTop: 50,
        paddingLeft: 0,
        paddingBottom: 5
    },
    promptText: promptTexts.promptText,
    textBoxContainer: {
        paddingBottom: 20
    },
    textBox: {
        height: 40,
        borderColor: Colors.tOSUgray,
        borderWidth: 2,
        borderBottomWidth: 5,
        borderRadius: 5
    },
}),

checkBoxes = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 8,
        paddingHorizontal: 20
    },
    text: {
        color: Colors.tOSUblack,
        height: 40
    }

});



export { buttons, textBoxes, promptTexts }