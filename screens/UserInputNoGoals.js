import * as React from 'react';

import {decode, encode} from 'base-64';

import { StyleSheet, ActivityIndicator, View } from 'react-native';

import Colors from '../constants/Colors';

import AwesomeAlert from 'react-native-awesome-alerts';

import AsyncStorage from '@react-native-community/async-storage';

import OSUButton from '../components/Button.js';
import OSUPrompt from '../components/Prompt.js';

import * as firebase from 'firebase';
import 'firebase/firestore';

const haversine = require('haversine');

class UserInputNoGoals extends React.Component{
	
	state = {showAlert: false, animate: false, UserLocation: JSON.parse(global.Location).coords};
	constructor(props){
		super (props);

		this.location;
		this.message = '';

		this.SaveUserData = this.SaveUserData.bind(this);
		this.getData = this.getData.bind(this);
		this.saveData = this.saveData.bind(this);
		this.getClosestLocation = this.getClosestLocation.bind(this);
		this.getMessageData = this.getMessageData.bind(this);
	}


	getMessageData(){
		return "hi";
	}

	getClosestLocation(){
			var userLocation = {latitude: this.state.UserLocation.latitude, longitude: this.state.UserLocation.longitude};

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
	async SaveUserData(user){
		//Used to correct missing variable bug.  This is a bug with react native, we are using the recommended workaround
		//-Venables
		if (!global.btoa) {  global.btoa = encode; }

		if (!global.atob) { global.atob = decode; }

			

		//Initialize Firebase..
		if(!firebase.apps.length){
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
		if(user.restrictions.Eggs){
			snapshot = snapshot.where("restriction_egg_free","==",user.restrictions.Eggs);
		}
		if(user.restrictions.Gluten){
			snapshot = snapshot.where("restriction_gluten_free","==",user.restrictions.Gluten);
		}
		if(user.restrictions.Fish){
			snapshot = snapshot.where("restriction_fish_free","==",user.restrictions.Fish);
		}
		if(user.restrictions.Peanut){
			snapshot = snapshot.where("restriction_peanut_free","==",user.restrictions.Peanut);
		}
		if(user.restrictions.Soy){
			snapshot = snapshot.where("restriction_soy_free","==",user.restrictions.Soy);
		}
		if(user.restrictions.TreeNuts){
			snapshot = snapshot.where("restriction_treenut_free","==",user.restrictions.TreeNuts);
		}
		if(user.restrictions.Vegan){
			snapshot = snapshot.where("restriction_vegan","==",user.restrictions.Vegan);
		}
		if(user.restrictions.Vegatarian){
			snapshot = snapshot.where("restriction_vegatarian","==",user.restrictions.Vegatarian);
		}
		if(user.restrictions.ShellFish){
			snapshot = snapshot.where("restriction_shellfish_free","==",user.restrictions.ShellFish);
		}
		snapshot.get().then(snapshot => {snapshot.forEach(doc => {nextState.push({'name': doc.data().name, 'calories': doc.data().total_calories})})});



		//waits for the query to finish before navigating
		//-Venables
		await setTimeout(() => {this.setState({animate: false}), this.props.navigation.navigate('NearestFoodScreen', { user, location, nextState, restaurantLocation });; }, 1500);
}

//Parses JSON with key userInfo and fills values to user
 	async getData() {
		try{
			const jsonUser = await AsyncStorage.getItem('userInfo');
			user = JSON.parse(jsonUser);
			this.message = 
				'Meal Plan: ' + user.mealPlan.type + '\n'
				+ 'Gluten: ' + user.restrictions.Gluten + '\n'
				+ 'Shellfish: ' + user.restrictions.ShellFish + '\n'
				+ 'Eggs: ' + user.restrictions.Eggs + '\n'
				+ 'Fish: ' + user.restrictions.Fish + '\n'
				+ 'Peanuts: ' + user.restrictions.Peanuts + '\n'
				+ 'Soy: ' + user.restrictions.Soy + '\n'
				+ 'TreeNuts: ' + user.restrictions.TreeNuts + '\n'
				+ 'Wheat: ' + user.restrictions.Wheat + '\n'
				+ 'Dairy: ' + user.restrictions.Dairy + '\n'
				+ 'Vegetarian: ' + user.restrictions.Vegetarian + '\n'
				+ 'Vegan: ' + user.restrictions.Vegan + '\n'
			;
		}catch(e){
			console.log(e);
		}
	}

	//Loaded with every render to update the changes made to the user attributes
	async saveData (user){
		try{
			await AsyncStorage.setItem('userInfo', JSON.stringify(user));
		}catch(e){
			console.log(e);
		}
	}
	
	render(){
		var { user } = this.props.route.params;
		const animate = this.state.animate;
		const showAlert = this.state.showAlert;

		this.message = 
				'Meal Plan: ' + user.mealPlan.type + '\n'
				+ 'Gluten: ' + (user.restrictions.Gluten ? "Yes":"No") + '\n'
				+ 'Shellfish: ' + (user.restrictions.ShellFish ? "Yes":"No") + '\n'
				+ 'Eggs: ' + (user.restrictions.Eggs ? "Yes":"No") + '\n'
				+ 'Fish: ' + (user.restrictions.Fish ? "Yes":"No") + '\n'
				+ 'Peanuts: ' + (user.restrictions.Peanuts ? "Yes":"No") + '\n'
				+ 'Soy: ' + (user.restrictions.Soy ? "Yes":"No") + '\n'
				+ 'TreeNuts: ' + (user.restrictions.TreeNuts ? "Yes":"No") + '\n'
				+ 'Wheat: ' + (user.restrictions.Wheat ? "Yes":"No") + '\n'
				+ 'Dairy: ' + (user.restrictions.Dairy ? "Yes":"No") + '\n'
				+ 'Vegetarian: ' + (user.restrictions.Vegetarian ? "Yes":"No") + '\n'
				+ 'Vegan: ' + (user.restrictions.Vegan ? "Yes":"No") + '\n'
			;

		this.getClosestLocation();
		this.saveData(user);
	
		return(
			<View>
				<OSUPrompt prompt = 'Please enter the following information about yourself:'/>
				<OSUButton
					onPress={() => this.props.navigation.navigate('MealPlanInputScreen', { user })}
					title='Meal Plan'
				/>
				<OSUButton
					onPress={() => this.props.navigation.navigate('RestrictionInputScreen', { user })}
					title='Restrictions'
				/>
				<OSUButton
					title='Display Data'
					onPress={e => {e.preventDefault(), this.setState({showAlert: true}), this.getData(user)}}
				/>
				<OSUButton 
					title='Continue'
					onPress={e => {e.preventDefault(), this.setState({animate: true}), this.SaveUserData(user)}}
					submit={true}
				/>
				<ActivityIndicator 
					animating = {animate}
					size = 'large'
				/>

				<AwesomeAlert
					show={showAlert}
					showProgress={false}
					title="User Data"
					message = {this.message}
					closeOnTouchOutside={true}
					closeOnHardwareBackPress={false}
					showConfirmButton={true}
					confirmText="Got it!"
					confirmButtonColor={Colors.tOSUscarlet}
					onCancelPressed={() => {
						this.setState({showAlert: false});
					}}
					onConfirmPressed={() => {
						this.setState({showAlert: false});
					}}
				/>

			</View>
		);
	}
}
export default UserInputNoGoals;
