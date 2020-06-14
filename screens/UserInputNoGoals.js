import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

//navigates to each respective input screen
//-Venables
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
			/>
			<Button
				onPress={() => navigation.navigate('RestrictionInputScreen', { user })}
				title='Restrictions'
			/>
			<Button
				title='Next'
				//onPress={() => navigation.navigate('MealScreen')}
			/>
		</View>
	);
}