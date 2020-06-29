import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OSUButton from '../components/Button.js'

export default function HomeScreen( { navigation } ) {

  return (
    <View style={styles.container}>
      <OSUButton onPress={() => navigation.navigate('UserInput')} title="Enter Data" />
       {/* <Button
          onPress={() => navigation.navigate('UserInput')}
          title="Enter Data"
          color="#990000"
        /> */}
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  
});