import {StyleSheet } from 'react-native'
import Colors from '../constants/Colors';

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
})

const textBox = StyleSheet.create({
    container: {
        paddingHorizontal: 50
    },
    textBox: {

    },
    text: {
        color: Colors.tOSUblack,
    }
})
export { buttons }