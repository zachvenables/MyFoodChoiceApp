import * as React from 'react';

import {decode, encode} from 'base-64';

import { View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

import * as firebase from 'firebase';
import 'firebase/firestore';


//navigates to each respective input screen
//-Venables


async function SaveUserData(user, navigation){
  
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
	var nextState = [];

  //Queries the firestore for the first location name ***UPDATE WHEN WE ADD GEOLOCATION***
  //-Venables
	const snapshota = await database.collection('location').doc('restaraunt_a1').get();
	location = snapshota.data().name;
	
  //queries the data about the first restaurant ***UPDATE WHEN WE ADD GEOLOCATION***
  //-Venables
	var snapshot = await database.collection('location').doc('restaraunt_a1').collection('foods');
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
	await setTimeout(() => { navigation.navigate('NearestFoodScreen', { user, location, nextState });; }, 2000);
	}
		

//Parses JSON with key userInfo and fills values to user
const getData = async () => {
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

// Save User Input as a JSON with key userInfo.
const saveData = async (user) => {
		try{
			await AsyncStorage.setItem('userInfo', JSON.stringify(user));
			alert('saved!');
		}catch(e){
			console.log(e);
		}
	}
	
function toFoodScreen(user, navigation){
	navigation.navigate('NearestFoodScreen', { user });
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
				title='Save Data'
				onPress={e => {e.preventDefault(), saveData(user), SaveUserData(user, navigation)}}
			/>
			<OSUButton
				title='Display Data'
				onPress={e => {e.preventDefault(), getData(user)}}
			/>
		</View>
	);
	
}