import * as React from 'react';
import { Image, Alert, Text, StyleSheet, View} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';
import OSUButton from '../components/Button.js';
import User from '../User.js'

class HomeScreen extends React.Component {

    state = {
        location: null
    };

    constructor(props){
        super (props);
        /*
        navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				this.setState({ location });
			},
			error => Alert.alert(error.message),
			{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
	    );

        global.Location = this.state.location;
        */
    
    }

  //If user data exists, give option to edit data or continue.
  //If no data exists, continue with user input process.  
  async checkUserData() {

    var user = new User();
    try {
       const jsonUser = await AsyncStorage.getItem('userInfo');
       if (jsonUser != null){
        
         user = JSON.parse(jsonUser);
         this.props.navigation.navigate('UserInputGoals', { user })
       }
       else {
       
        this.props.navigation.navigate('UserInputGoals', { user })
      }
    } catch (e) {
        console.log(e);
    }
}


  render(){  
    
    //Gets the user's location from their device and stores it as a global variable
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
        <View style={{backgroundColor: 'white', paddingBottom: 400}}>
            <View style={{paddingTop: '40%', alignItems: 'center'}}>
                <Image style={{ width: 150, height: 150}}source = {require('../assets/images/Logo.jpg')}/>
            </View>
            <View style = {{paddingTop: '5%', paddingBottom: '7%', alignItems: 'center', justifyContent: 'center'}}>
                <Text style = {styles.text}> OSU MyFoodChoice</Text>
            </View>
            
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
  
  text: {
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: 5,
     paddingLeft: 20
  }
  
});

export default HomeScreen;