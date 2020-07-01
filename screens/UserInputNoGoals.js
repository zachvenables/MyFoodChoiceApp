import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
<<<<<<< Updated upstream
import { StyleSheet, Button, Text, View } from 'react-native';
=======
import { View } from 'react-native';

import * as firebase from 'firebase';
import 'firebase/firestore';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'

>>>>>>> Stashed changes

//navigates to each respective input screen
//-Venables


async function SaveUserData(user, navigation){

	
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

	var location = "";

	await this.database.collection('location').doc('restaraunt_a1').get().then(function (doc) {
			if(doc.exists){
				location = doc.data().name;
				
			}else{
				alert('error');
			}
		});

	var nextState = [];

	var foodItems = await this.database.collection('location').doc('restaraunt_a1').collection('foods');

	await foodItems.get().then(function(doc) {
		var i = 0;
		doc.forEach(function(item){
			nextState.push({'name': item.data().name, 'calories': item.data().total_calories, 'id':i});
			i += 1;
		});
	});

		
	navigation.navigate('NearestFoodScreen', { user, location, nextState});
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


	const styles = StyleSheet.create({
		  container: {
			flex: 1,
			alignItems: "center",
			backgroundColor: "#fff",
		  },

		  button: {
			width: "60%",
			height: 50,
		  },

		  text: {
			height: 170,
			justifyContent: 'center',
		  },
	});


	
	return(
		<View style={styles.container}>
			<View style={styles.text}>
				<Text>Please enter the following information about yourself:</Text>
			</View>
			<View style={styles.button}>
			<Button
				onPress={() => navigation.navigate('MealPlanInputScreen', { user })}
				title='Meal Plan'
				color= '#990000'
			/>
			</View>
			<View style={styles.button}>
			<Button
				onPress={() => navigation.navigate('RestrictionInputScreen', { user })}
				title='Restrictions'
				color= '#990000'
			/>
			</View>
			<View style={styles.button}>
			<Button
				title='Next'
				onPress={e => {e.preventDefault(), SaveUserData(user, navigation)}}
				color= '#990000'
			/>
			</View>
		</View>
	);




	
}