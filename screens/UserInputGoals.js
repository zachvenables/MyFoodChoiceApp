import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

//navigates to each respective input screen
//-Venables
export default function UserInputScreen( {route, navigation } ){
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
				onPress={() => navigation.navigate('WeightInputScreen', { user })}
				title='Weight'
				color= '#990000'
			/>
			<Button
				onPress={() => navigation.navigate('AgeInputScreen', { user })}
				title='Age'
				color= '#990000'
			/>
			<Button
				onPress={() => navigation.navigate('HeightInputScreen', { user })}
				title='Height'
				color= '#990000'
			/>
			<Button
				onPress={() => navigation.navigate('GoalInputScreen', { user })}
				title='Goal'
				color= '#990000'
			/>
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
				//onPress={() => navigation.navigate('MealScreen')}
				color= '#990000'
			/>
		</View>
	);
}