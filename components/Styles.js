import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors';
import { colors } from 'react-native-elements';

const buttons = StyleSheet.create({
    container: {
        paddingHorizontal: 50,
        paddingVertical: 1
    },
    button: {
        backgroundColor: Colors.tOSUscarlet,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
    },
    submitButton: {
        backgroundColor: Colors.tOSUgray,
        borderRadius: 10,
        paddingHorizontal: 10,
        paddingVertical: 6,
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
            alignItems: 'center',
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
            paddingTop: 10,
            paddingLeft: 0,
            paddingBottom: 5,
            fontSize: 20
        },
        promptText: promptTexts.promptText,
        textBoxContainer: {
            paddingBottom: 5
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
            paddingLeft: 60
        },
        text: {
            color: Colors.tOSUblack,
            height: 28,
            fontSize: 20,
            fontWeight: 'bold'
        }

    }),

    modals = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        modalView: {
            margin: 20,
            backgroundColor: colors.tOSUwhite,
            borderRadius: 10,
            padding: 40,
            alignItems: "center"
        }
    })



export { buttons, textBoxes, promptTexts, checkBoxes, modals }