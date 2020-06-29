import * as React from 'react';
import { StyleSheet, View } from 'react-native';

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