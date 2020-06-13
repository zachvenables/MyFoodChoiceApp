import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Button, Text, View } from 'react-native';

//navigates to each respective input screen
//-Venables
export default function UserInputScreen( {route, navigation } ){
	var {weight, age, height, goals, mealPlan, restrictions} = route.params;
	alert(
		'weight: ' + weight + '\n'
		+ 'age: ' + age + '\n'
		+ 'height: ' + height + '\n'
		+ 'goals: ' + goals + '\n'
		+ 'mealPlan: ' + mealPlan + '\n'
		+ 'restrictions: ' + restrictions + '\n'
	);
	
	return(
		<View>
			<Text>Please enter the following information about yourself:</Text>
			<Button
				onPress={() => navigation.navigate('WeightInputScreen')}
				title='Weight'
			/>
			<Button
				onPress={() => navigation.navigate('AgeInputScreen')}
				title='Age'
			/>
			<Button
				onPress={() => navigation.navigate('HeightInputScreen')}
				title='Height'
			/>
			<Button
				onPress={() => navigation.navigate('GoalInputScreen')}
				title='Goal'
			/>
			<Button
				onPress={() => navigation.navigate('MealPlanInputScreen')}
				title='Meal Plan'
			/>
			<Button
				onPress={() => navigation.navigate('RestrictionInputScreen')}
				title='Restrictions'
			/>
		</View>
	);
}