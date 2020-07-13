import * as React from 'react';
import { StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OSUButton from '../components/Button.js'
import User from '../User.js'

class HomeScreen extends React.Component {


  //If user data exists, give option to edit data or continue.
  //If no data exists, continue with user input process.  
  async checkUserData() {
    try {
       const jsonUser = await AsyncStorage.getItem('userInfo');
       if (jsonUser != null){
         var user = new User();
         user = JSON.parse(jsonUser);
         this.props.navigation.navigate('UserInputNoGoals', { user })
       }
       else {
        this.props.navigation.navigate('UserInput')
      }
    } catch (e) {
        console.log(e);
    }
}

  render(){  
    return (
      <View style={styles.container}>
       <OSUButton onPress={e => {e.preventDefault(), this.checkUserData()}} title="Enter Data" />
        {/* <Button
          onPress={() => navigation.navigate('UserInput')}
          title="Enter Data"
          color="#990000"
          /> */}
      </View>
  );
  }
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

export default HomeScreen;