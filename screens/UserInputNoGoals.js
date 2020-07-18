import * as React from 'react';

import {decode, encode} from 'base-64';

import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

import * as firebase from 'firebase';
import 'firebase/firestore';


class UserInputNoGoals extends React.Component{
	state = {animate: false, UserLocation: JSON.parse(global.Location).coords};
	constructor(props){
		super (props);

		this.location;
		

		this.SaveUserData = this.SaveUserData.bind(this);
		this.getData = this.getData.bind(this);
		this.saveData = this.saveData.bind(this);
		this.getClosestLocation = this.getClosestLocation.bind(this);
	}

	getClosestLocation(){
			var locations = [{name: 'restaraunt_a1', latitude: 39.996768, longitude: -83.013802}, 
				{name: 'restaraunt_a3', latitude: 40.004874, longitude: -83.013215}, 
				{name: 'restaraunt_a4', latitude: 40.004307, longitude: -83.010929}, 
				{name: 'restaraunt_a5', latitude: 39.999364, longitude: -83.018258}, 
				{name: 'restaraunt_a6', latitude: 39.994172, longitude: -83014106}, 
				{name: 'restaraunt_a7', latitude: 39.997536, longitude: -83.014577}, 
				{name: 'restaraunt_a8', latitude: 39.999948, longitude: -83.021801}, 
				{name: 'restaraunt_a10', latitude: 40.002565, longitude: -83.016633}, 
				{name: 'restaraunt_a11', latitude: 40.002834, longitude: -83.016698}, 
				{name: 'restaraunt_a12', latitude: 40.007038, longitude: -83.018217}, 
				{name: 'restaraunt_a13', latitude: 40.004059, longitude: -83.013186},
				{name: 'restaraunt_a14', latitude: 40.000792, longitude: -83.015056}
			];

		var minDistance = 1000000;
		var closestLocation = locations[0];
		for(var i = 0; i < locations.length; i ++){
			var x = locations[i].latitude;
			var y = locations[i].longitude;
			var userX = this.state.UserLocation.latitude;
			var userY = this.state.UserLocation.longitude;
			
			var distance = Math.sqrt(Math.pow((Math.abs(x-userX)), 2)+Math.pow(Math.abs(y-userY), 2));
			
			if (distance < minDistance){
				minDistance = distance;
				closestLocation = locations[i];
			}
		}

		this.location = closestLocation;


	}

	//saves the users data, accesses the firebase, navigates to the next screen
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
			const snapshota = await database.collection('location').doc(this.location.name).get();
			location = snapshota.data().name;
	
		  //queries the data about the first restaurant ***UPDATE WHEN WE ADD GEOLOCATION***
		  //-Venables
			const snapshot = await database.collection('location').doc(this.location.name).collection('foods').get();
			snapshot.docs.map(doc => nextState.push({'name': doc.data().name, 'calories': doc.data().total_calories}));

			//waits for the query to finish before navigating
		  //-Venables
			await setTimeout(() => {this.setState({animate: false}), this.props.navigation.navigate('NearestFoodScreen', { user, location, nextState, restaurantLocation });; }, 1500);
	}

	//Parses JSON with key userInfo and fills values to user
	async getData(user) {
			try{
				const jsonUser = await AsyncStorage.getItem('userInfo');
				user = JSON.parse(jsonUser);
				alert(
					'mealPlan: ' + user.mealPlan.type + '\n'
					+ 'TradVisits: ' + user.mealPlan.WeeklyTraditionalVisits + '\n'
					+ 'TradVisitExch: ' + user.mealPlan.TraditionalVisitExchange + '\n'
					+ 'DiningDollars: ' + user.mealPlan.DiningDollars + '\n'
					+ 'BuckIDCash: ' + user.mealPlan.BuckIDCash + '\n'
					+ 'gluten: ' + user.restrictions.Gluten + '\n'
					+ 'shellfish: ' + user.restrictions.ShellFish + '\n'
					+ 'eggs: ' + user.restrictions.Eggs + '\n'
					+ 'fish: ' + user.restrictions.Fish + '\n'
					+ 'peanuts: ' + user.restrictions.Peanuts + '\n'
					+ 'soy: ' + user.restrictions.Soy + '\n'
					+ 'treenuts: ' + user.restrictions.TreeNuts + '\n'
					+ 'vegetarian: ' + user.restrictions.Vegetarian + '\n'
					+ 'vegan: ' + user.restrictions.Vegan + '\n'
					+ 'age: ' + user.age + '\n'
					+ 'weight: ' + user.weight + '\n'
					+ 'height: ' + user.height + '\n'
					+ 'goals: ' + user.goals + '\n'
				);
			}catch(e){
				console.log(e);
			}
	}

	async saveData (user){
		try{
			await AsyncStorage.setItem('userInfo', JSON.stringify(user));
			//alert('saved!');
		}catch(e){
			console.log(e);
		}
	}
	
	render(){
		var { user } = this.props.route.params;
		const animate = this.state.animate;

		this.getClosestLocation();

	
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
					title='Save Data'
					onPress={e => { this.saveData(user), this.setState({animate: true}), this.SaveUserData(user)}}
				/>
				<OSUButton
					title='Display Data'
					onPress={e => {e.preventDefault(), this.getData(user)}}
				/>
				<ActivityIndicator 
					animating = {animate}
					size = "large"
				/>
			</View>
		);
	}
	
}

export default UserInputNoGoals;