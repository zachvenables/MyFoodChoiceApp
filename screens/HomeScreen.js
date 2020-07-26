import * as React from 'react';
import { Alert, Text, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';
import OSUButton from '../components/Button.js'
import User from '../User.js'

class HomeScreen extends React.Component {

    state = {
        location: null
    };


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

    if(this.state.location == null){
        navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
	    );
	}

    global.Location = this.state.location;

    return (
      <View style={styles.container}>
      <Text>{this.state.location}</Text>
       <OSUButton onPress={e => {e.preventDefault(), this.checkUserData()}} title="Enter Data" />
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