import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

//navigates to each respective input screen
//-Venables
export default function UserInputNoGoals( {route, navigation } ){
	var {mealPlan, restrictions} = route.params;
	alert(
		'mealPlan: ' + mealPlan.type + '\n'
		+ 'TradVisits: ' + mealPlan.WeeklyTraditionalVisits + '\n'
		+ 'TradVisitExch: ' + mealPlan.TraditionalVisitExchange + '\n'
		+ 'DiningDollars: ' + mealPlan.DiningDollars + '\n'
		+ 'BuckIDCash: ' + mealPlan.BuckIDCash + '\n'
		+ 'gluten: ' + restrictions.Gluten + '\n'
		+ 'shellfish: ' + restrictions.ShellFish + '\n'
		+ 'eggs: ' + restrictions.Eggs + '\n'
		+ 'fish: ' + restrictions.Fish + '\n'
		+ 'peanuts: ' + restrictions.Peanuts + '\n'
		+ 'soy: ' + restrictions.Soy + '\n'
		+ 'treenuts: ' + restrictions.TreeNuts + '\n'
		+ 'vegetarian: ' + restrictions.Vegetarian + '\n'
		+ 'vegan: ' + restrictions.Vegan + '\n'
	);
	
	return(
		<View>
			<Text>Please enter the following information about yourself:</Text>
			<Button
				onPress={() => navigation.navigate('MealPlanInputScreen', { mealPlan, restrictions })}
				title='Meal Plan'
			/>
			<Button
				onPress={() => navigation.navigate('RestrictionInputScreen', { mealPlan, restrictions })}
				title='Restrictions'
			/>
			<Button
				title='Next'
				//onPress={() => navigation.navigate('MealScreen')}
			/>
		</View>
	);
}