import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';




export default function HomeScreen( { navigation } ) {

  return (
    <View style={styles.container}>
        <View style={styles.button}>
           <Button
              onPress={() => navigation.navigate('UserInput')}
              title="Enter Data"
              color="#990000"
            />
        </View>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },

  button:{
    width: "60%"
  },
  
});