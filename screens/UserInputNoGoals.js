import * as React from 'react';

import {decode, encode} from 'base-64';

import { View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

import * as firebase from 'firebase';
import 'firebase/firestore';


//navigates to each respective input screen
//-Venables

async function SaveUserData(user, navigation){

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
	var nextState = [];
	var food = [];

	const snapshota = await database.collection('location').doc('restaraunt_a1').get();
	location = snapshota.data().name;
	console.log("location: " + location);
	
	const snapshot = await database.collection('location').doc('restaraunt_a1').collection('foods').get();
	snapshot.docs.map(doc => nextState.push({'name': doc.data().name, 'calories': doc.data().total_calories}));

	
	
	await setTimeout(() => { navigation.navigate('NearestFoodScreen', { user, location, nextState });; }, 2000);
	

	//var foodItems = await this.database.collection('location');
	/*
	await foodItems.get().then(async function(doc) {
		var i = 0;
		await doc.forEach(async function(item){
			await nextState.push({'name': item.data().name, 'calories': item.data().total_calories, 'id':i});
			i += 1;
		});
	});
	*/
		
	//navigation.navigate('NearestFoodScreen', { user, location });
}

export default function UserInputNoGoals( {route, navigation } ){
	var { user } = route.params;
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



	
	return(
		<View>
			<OSUPrompt prompt = 'Please enter the following information about yourself:'/>
			<OSUButton
				onPress={() => navigation.navigate('MealPlanInputScreen', { user })}
				title='Meal Plan'
			/>
			<OSUButton
				onPress={() => navigation.navigate('RestrictionInputScreen', { user })}
				title='Restrictions'
			/>
			<OSUButton
				title='Next'
				onPress={e => {e.preventDefault(), SaveUserData(user, navigation)}}
			/>
		</View>
	);




	
}