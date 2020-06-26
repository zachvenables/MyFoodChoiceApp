import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

//navigates to each respective input screen
//-Venables

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
			<Text>Please enter the following information about yourself:</Text>
			<Button
				onPress={() => navigation.navigate('MealPlanInputScreen', { user })}
				title='Meal Plan'
				color= '#990000'
			/>
			<Button
				onPress={() => navigation.navigate('RestrictionInputScreen', { user })}
				title='Restrictions'
				color= '#990000'
			/>
			<Button
				title='Next'
				onPress={e => {e.preventDefault(), saveData(user)}}
				color= '#990000'
			/>
			<Button
				title='Display Data'
				onPress={e => {e.preventDefault(), getData(user)}}
				color= '#990000'
			/>
		</View>
	);
}