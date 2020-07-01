//import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { ScrollView, TextInput, Button, Text, View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

import {decode, encode} from 'base-64';

import * as firebase from 'firebase';
import 'firebase/firestore';


class NearestFoodScreen extends React.Component {
	
	constructor(props) {
		super (props);
		/*
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
		
		this.database = firebase.firestore();
		*/
		
		this.locationName = "Eatery";

		this.state = {
			foods: [
				{'name': 'FoodA', 'calories': 100, 'id': 1},
				{'name': 'FoodB', 'calories': 200, 'id': 2},
				{'name': 'FoodC', 'calories': 300, 'id': 3},
				{'name': 'FoodD', 'calories': 400, 'id': 4},
				{'name': 'FoodE', 'calories': 100, 'id': 5},
				{'name': 'FoodF', 'calories': 320, 'id': 6},
				{'name': 'FoodG', 'calories': 500, 'id': 7},
				{'name': 'FoodH', 'calories': 100, 'id': 8},
				{'name': 'FoodI', 'calories': 300, 'id': 9}
			]
		};
		
		this.mealPlanCheck = this.mealPlanCheck.bind(this);
		this.loadNextLocation = this.loadNextLocation.bind(this);
		this.getDirections = this.getDirections.bind(this);
		this.getData = this.getData.bind(this);
	}

	getData(data){
		alert(snapshot.val());
	}


	
	//-Venables
	mealPlanCheck(user) {
		alert('Show Meal plan status');
	}

	loadNextLocation(user){
		alert('load next clost eatery');
	}

	getDirections(user){
		alert('go to directions screen');
	}

	render() {
		var { user, location } = this.props.route.params;

		//alert(this.database.collection('location'));
		
		return(
		<View style={{flex: 1, flexDirection: 'column', alignItems: 'stretch',}}>
			<OSUPrompt prompt = 'Nearest Food' />
			<OSUButton 
					title="Meal Plan Balance" 
					onPress= {e => {e.preventDefault(), this.mealPlanCheck(user)}}
			/>
			<OSUPrompt prompt = {location} />
			<View style={{width: '100%', height: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey'}}>
				<ScrollView style={{width: '90%'}}>
					{
						this.state.foods.map((item, index) =>(
							<View key={item.id} style={{width: '95%', justifyContent: 'center', alignItems: 'center'}}>
								<Text>{item.name}     Calories: {item.calories}</Text>
							</View>
						))
					}
				</ScrollView>
			</View>
			<OSUButton 
				title="Next Location"
				onPress={e => {e.preventDefault(), this.loadNextLocation(user)}}
			/>
			<OSUButton 
				title="Get Directions"
				onPress={e => {e.preventDefault(), this.getDirections(user)}}
			/>
			
			
		</View>
		);


	}
}

export default NearestFoodScreen;