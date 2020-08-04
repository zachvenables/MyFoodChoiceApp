import * as React from 'react';
import { ActivityIndicator, Image, Alert, Text, StyleSheet, View} from 'react-native';
import { decode, encode } from 'base-64';
import AsyncStorage from '@react-native-community/async-storage';
import * as Location from 'expo-location';
import OSUButton from '../components/Button.js';
import User from '../User.js';
import * as firebase from 'firebase';

const haversine = require('haversine');

class HomeScreen extends React.Component {

    state = {
		animate: false,
        location: null,
        pos: null
    };

    constructor(props){
        super (props);
     
		this.SaveUserData = this.SaveUserData.bind(this);
        this.getClosestLocation = this.getClosestLocation.bind(this);
    }

    //calculates distances to all of the dining locations to the user and then sorts them in order of shortest distance.
	//-Venables
	getClosestLocation(){
			var userLocation = {latitude: this.state.pos.coords.latitude, longitude: this.state.pos.coords.longitude};

			var locations = [{name: 'restaraunt_a1', latitude: 39.996768, longitude: -83.013802, distance: haversine(userLocation, {latitude: 39.996768, longitude: -83.013802})}, 
				{name: 'restaraunt_a3', latitude: 40.004874, longitude: -83.013215, distance: haversine(userLocation, {latitude: 40.004874, longitude: -83.013215})}, 
				{name: 'restaraunt_a4', latitude: 40.004307, longitude: -83.010929, distance: haversine(userLocation, {latitude: 40.004307, longitude: -83.010929})}, 
				{name: 'restaraunt_a7', latitude: 39.997536, longitude: -83.014577, distance: haversine(userLocation, {latitude: 39.997536, longitude: -83.014577})}, 
				{name: 'restaraunt_a8', latitude: 39.999948, longitude: -83.021801, distance: haversine(userLocation, {latitude: 39.999948, longitude: -83.021801})}, 
				{name: 'restaraunt_a10', latitude: 40.002565, longitude: -83.016633, distance: haversine(userLocation, {latitude: 40.002565, longitude: -83.016633})}, 
				{name: 'restaraunt_a11', latitude: 40.002834, longitude: -83.016698, distance: haversine(userLocation, {latitude: 40.002834, longitude: -83.016698})}, 
				{name: 'restaraunt_a12', latitude: 40.007038, longitude: -83.018217, distance: haversine(userLocation, {latitude: 40.007038, longitude: -83.018217})}, 
				{name: 'restaraunt_a14', latitude: 40.000792, longitude: -83.015056, distance: haversine(userLocation, {latitude: 40.000792, longitude: -83.015056})}
			];

		locations = locations.sort(function (a, b){
			return a.distance > b.distance;	

		});

		this.location = locations[0];
		global.locationStack = locations;		
	}
    
	//saves the users data, accesses the firebase, navigates to the next screen
	//-Venables
	async SaveUserData(user) {
		//Used to correct missing variable bug.  This is a bug with react native, we are using the recommended workaround
		//-Venables
		if (!global.btoa) { global.btoa = encode; }

		if (!global.atob) { global.atob = decode; }

		//Initialize Firebase..
		if (!firebase.apps.length) {
			firebase.initializeApp({
				apiKey: "AIzaSyBCjwYHTf9Yj1kAN7mByIhnA3rD0OZlzJY",
				authDomain: "osumyfoodchoiceapp-a8fd6.firebaseapp.com",
				databaseURL: "https://osumyfoodchoiceapp-a8fd6.firebaseio.com",
				projectId: "osumyfoodchoiceapp-a8fd6",
				storageBucket: "osumyfoodchoiceapp-a8fd6.appspot.com",
				messagingSenderId: "752614312654",
				appId: "1:752614312654:web:e3234a1c1c83e85a0dde9f",
				measurementId: "G-XKCPW0Q23G"
			});
		}

		var database = firebase.firestore();
		var location = "";
		var restaurantLocation = this.location;
		var nextState = [];
		
		//Queries the firestore for the first location name ***UPDATE WHEN WE ADD GEOLOCATION***
		//-Venables
		const snapshota = await database.collection('location').doc(restaurantLocation.name).get();
		location = snapshota.data().name;

		//queries the data about the first restaurant ***UPDATE WHEN WE ADD GEOLOCATION***
		//-Venables
		var snapshot = await database.collection('location').doc(restaurantLocation.name).collection('foods');

		//remove restrictions
		if (user.restrictions.Eggs) {
			snapshot = snapshot.where("restriction_egg_free", "==", user.restrictions.Eggs);
		}
		if (user.restrictions.Gluten) {
			snapshot = snapshot.where("restriction_gluten_free", "==", user.restrictions.Gluten);
		}
		if (user.restrictions.Fish) {
			snapshot = snapshot.where("restriction_fish_free", "==", user.restrictions.Fish);
		}
		if (user.restrictions.Peanut) {
			snapshot = snapshot.where("restriction_peanut_free", "==", user.restrictions.Peanut);
		}
		if (user.restrictions.Soy) {
			snapshot = snapshot.where("restriction_soy_free", "==", user.restrictions.Soy);
		}
		if (user.restrictions.TreeNuts) {
			snapshot = snapshot.where("restriction_treenut_free", "==", user.restrictions.TreeNuts);
		}
		if(user.restrictions.Wheat){
			snapshot = snapshot.where("restriction_wheat_free", "==", user.restrictions.Wheat);
		}
		if (user.restrictions.Vegan) {
			snapshot = snapshot.where("restriction_vegan", "==", user.restrictions.Vegan);
		}
		if (user.restrictions.Vegetarian) {
			snapshot = snapshot.where("restriction_vegetarian", "==", user.restrictions.Vegetarian);
		}
		if (user.restrictions.ShellFish) {
			snapshot = snapshot.where("restriction_shellfish_free", "==", user.restrictions.ShellFish);
		}
		snapshot.get().then(snapshot => { snapshot.forEach(doc => { nextState.push({ 'name': doc.data().name, 'calories': doc.data().total_calories }) }) });


		//waits for the query to finish before navigating
		//-Venables
		await setTimeout(() => { this.setState({ animate: false }), this.props.navigation.navigate('NearestFoodScreen', { user, location, nextState, restaurantLocation });; }, 1500);
	}

  //If user data exists, give option to edit data or continue.
  //If no data exists, continue with user input process.  
	async checkUserData() {

		var user = new User();
		try {
			const jsonUser = await AsyncStorage.getItem('userInfo');
			if (jsonUser == null){
				
				user = JSON.parse(jsonUser);
				this.SaveUserData(user);
			}
			else {
			this.setState({animate: false});
			this.props.navigation.navigate('UserInputGoals', { user })
			}
		} catch (e) {
			console.log(e);
		}
	}


  render(){ 
	const animate = this.state.animate;
    
    //Gets the user's location from their device and stores it as a global variable
    if(this.state.location == null || this.state.pos == null){
        navigator.geolocation.getCurrentPosition(
			position => {
				const location = JSON.stringify(position);

				this.setState({ location });
                this.setState({pos: position});

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
            <OSUButton onPress={e => {e.preventDefault(), this.setState({animate: true}),this.getClosestLocation(), this.checkUserData()}} title="Begin" />
			<ActivityIndicator
					animating={animate}
					size="large"
					color = 'grey'
					style = {{
						position: 'absolute',
						left: 0,
						right: 0,
						top: 200,
						bottom: 0,
						alignItems: 'center',
						justifyContent: 'center'
					}}
			/>
        </View>
  );
  }
}


const styles = StyleSheet.create({

  
  text: {
    fontWeight: "bold",
    fontSize: 24,
    paddingBottom: 5,
     paddingLeft: 20
  }
  
});

export default HomeScreen;