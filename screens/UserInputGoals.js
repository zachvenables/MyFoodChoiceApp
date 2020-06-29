import * as React from 'react';
import { View } from 'react-native';

import OSUButton from '../components/Button.js'
import OSUPrompt from '../components/Prompt.js'


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
			<OSUPrompt prompt = 'Please enter the following information about yourself:'/>
			<OSUButton
				onPress={() => navigation.navigate('WeightInputScreen', { user })}
				title='Weight'
			/>
			<OSUButton
				onPress={() => navigation.navigate('AgeInputScreen', { user })}
				title='Age'
			/>
			<OSUButton
				onPress={() => navigation.navigate('HeightInputScreen', { user })}
				title='Height'
			/>
			<OSUButton
				onPress={() => navigation.navigate('GoalInputScreen', { user })}
				title='Goal'
			/>
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
				//onPress={() => navigation.navigate('MealScreen')}
			/>
		</View>
	);
}